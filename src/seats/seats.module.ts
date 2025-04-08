import { forwardRef, Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { PrismaService } from 'src/prisma.service';
import { SessionsModule } from 'src/sessions/sessions.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => SessionsModule), AuthModule],
  controllers: [SeatsController],
  providers: [SeatsService, PrismaService],
  exports: [SeatsService]
})
export class SeatsModule {}
