import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'notifications',
  })
  handleCron() {
    this.logger.debug('Called every 30 seconds');
  }
}
