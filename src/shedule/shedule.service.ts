import { Injectable } from '@nestjs/common';
import { SessionsService } from 'src/sessions/sessions.service';
import { Cron,CronExpression } from '@nestjs/schedule';

@Injectable()
export class SheduleService {
  constructor(private readonly sesssionService: SessionsService) {}

  @Cron(CronExpression.EVERY_HOUR) 
  async handleCron() {
    await this.sesssionService.checkSessionAndSendEmails()
  }
}
