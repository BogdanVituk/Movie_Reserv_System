import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { SeatsModule } from 'src/seats/seats.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService],
  imports: [AuthModule, SeatsModule],
  exports: [BookingsService]
})
export class BookingsModule {}
