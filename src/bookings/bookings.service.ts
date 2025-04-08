import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SeatsService } from 'src/seats/seats.service';
import { BookSeatDto } from 'src/bookings/dto/book-seat.dto';

@Injectable()
export class BookingsService {

    constructor(
        private prisma: PrismaService,
        private seatService: SeatsService

    ) {}

    async getUserBookings(userId: number): Promise<Booking[]> {
        const bookings = await this.prisma.booking.findMany({
            where: {userId},
            include: {
                session: true,
                seat: true
            }
        })

        return bookings;
    }

    async cancelBookings(userId): Promise<Booking> {
        const booking = await this.prisma.booking.findFirst({
            where: {
                userId,
                session: {
                    startTime: {
                        gte: new Date(),
                    }
                }
            },
            orderBy: {session: {startTime: 'asc'}}
        })

        if(!booking) {
            throw new Error("No upcoming booking found")
        }

        await this.prisma.booking.delete({
            where: {id: booking.id}
        })

        await this.seatService.updateSeatStatus(booking.seatId, false)

        return booking
    }

    async bookSeat(dto: BookSeatDto): Promise<Booking> {
        const seat = await this.seatService.getSeatbyId(dto.seatId)

        if(!seat || seat.isBooked) {
            throw new Error("Seat is already booked")
        }

        await this.seatService.updateSeatStatus(dto.seatId, true)

        const booking = await this.prisma.booking.create({
            data: {
                userId: dto.userId,
                seatId: dto.seatId,
                sessionId: dto.sessionId
            }
        })

        return booking;
    }   
}
