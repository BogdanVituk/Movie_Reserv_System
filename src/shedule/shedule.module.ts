import { Module } from '@nestjs/common';
import { SheduleService } from './shedule.service';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  providers: [SheduleService],
})
export class SheduleModule {}
