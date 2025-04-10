import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [UsersModule, EmailModule, BookingsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
