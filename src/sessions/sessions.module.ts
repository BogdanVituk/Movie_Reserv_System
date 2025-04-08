import { forwardRef, Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { PrismaService } from 'src/prisma.service';
import { SeatsModule } from 'src/seats/seats.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [forwardRef(() => SeatsModule), EmailModule],
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
  exports: [SessionsService]
})
export class SessionsModule {}
