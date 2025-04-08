import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Seat } from '@prisma/client';
import { CreateSeatDto } from './dto/create-seat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('seats')
@UseGuards(JwtAuthGuard)
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}


  @Get('/:sessionId')
  getAvailbleSeats(@Param('sessionId') sessionId: string): Promise<Seat[]> {
    return this.seatsService.getAvailableSeats(+sessionId)
  }

}
