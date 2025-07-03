import { Controller, Param, Post, Delete, UseGuards, Body, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookSeatDto } from './dto/book-seat.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Booking } from '@prisma/client';

@Controller('bookings')
// @UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiResponse({
      status: 201,
      description: "Усішно получено усі броюнвання",
    })
  @Get('/user/:userId')
  getUserBookings(@Param('userId') userId: string ): Promise<Booking[]> {
    return this.bookingsService.getUserBookings(+userId)
  }

  @Delete('user/:userId/cancel') 
  cancelBooking(@Param('userId') userId: string) {
    return this.bookingsService.cancelBookings(+userId);
  }

  @Post()
  bookSeat(@Body() dto: BookSeatDto) {
    return this.bookingsService.bookSeat(dto)
  }
}
