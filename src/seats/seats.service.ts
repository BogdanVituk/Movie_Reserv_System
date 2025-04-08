import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Seat } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class SeatsService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => SessionsService))
        private sessionService: SessionsService
    ) {}


    async getAvailableSeats(sessionId: number): Promise<Seat[]> {
        const session = await this.sessionService.getSessionById(sessionId);

        if(!session) {
            throw new Error('Session not found')
        }

        const availableSeats = session.seats.filter(item => !item.isBooked);
        return availableSeats;
    }

    async getSeatbyId(seatId: number): Promise<Seat> {
        return await this.prisma.seat.findUnique({where: {id: seatId}})
    }

    async updateSeatStatus(seatId: number, isBooked: boolean): Promise<void> {
        await this.prisma.seat.update({
            where: { id: seatId },
            data: { isBooked}
        })
    }

    async createManySeats(seats: Seat[]): Promise<{ count: number }> {
        return this.prisma.seat.createMany({data: seats})
    }
}
