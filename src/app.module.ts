import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { SessionsModule } from './sessions/sessions.module';
import { BookingsModule } from './bookings/bookings.module';
import { SeatsModule } from './seats/seats.module';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { EmailModule } from './email/email.module';
import { SheduleModule } from './shedule/shedule.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.stage.${process.env.STAGE || 'dev'}`
    }),
    RoleModule,
    UsersModule,
    FilmsModule,
    SessionsModule,
    BookingsModule,
    SeatsModule,
    AuthModule,
    GenresModule,
    EmailModule,
    SheduleModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
