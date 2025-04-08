import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService,JwtAuthGuard],
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>  ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '12h' }
      })
    })
  ],
  exports: [
    AuthService,
    JwtModule,
    JwtAuthGuard
  ]
})
export class AuthModule {}
