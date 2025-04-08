import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { SeatsService } from 'src/seats/seats.service';
import { Booking, Seat, Session } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

interface SessionWithSeats {
    id: number;
    startTime: Date;
    endTime: Date;
    totalPlaces: number;
    filmId: number;
    seats: Seat[];
}



@Injectable()
export class SessionsService {

    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => SeatsService))
        private seatsService: SeatsService,
        private emailService: EmailService

    ) {}

    async createSessionWithSeats(dto: CreateSessionDto): Promise<Session> {
        const session = await this.prisma.session.create({
            data: {
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
                totalPlaces: dto.totalPlaces,
                filmId: dto.filmId
            }
        })

        if(!session) {
            throw new Error('Не вдалось створити сесію')
        }

        const totalPlaces = dto.totalPlaces;

        const totalRows = 10;
        const seatsPerRow = Math.ceil(totalPlaces/totalRows)

        const seats = [];

        for(let row = 1; row <= totalRows; row++) {
            for(let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
                if(seats.length < totalPlaces) {
                    seats.push({
                        sessionId: session.id,
                        row,
                        number: seatNumber,
                        isBooked: false
                    })
                }
            }
        }

        await this.seatsService.createManySeats(seats)
        

        return session;
    }

    

    async getSessionById(sessionId: number) {
        return await this.prisma.session.findUnique({
            where: {id: sessionId},
            include: {
                seats: true
            }
        })
    }

    async checkSessionAndSendEmails() {
        const now = new Date()
        const oneDayLater = new Date(now.getTime() + 24* 60* 60 * 1000)

        const sessions = await this.prisma.session.findMany({
            where: {
                startTime: {
                    gte: oneDayLater,
                    lt: new Date(oneDayLater.getTime() + 60 * 60 * 1000)
                },
                
            },
            include: {
                bookings: {
                    include: {
                        user: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        })

        for(const session of sessions) {
            for(const booking of session.bookings) {
                const email = booking.user.email
                await this.emailService.sendEmail(
                    email,
                    'Нагадування про сеанс фільму',
                    `Нагадуємо, що ваш сеанс фільму розпочнеться через 24 години: ${session.startTime}`,
                )
            }
        }
    }
}
