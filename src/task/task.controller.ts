import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { CronDto } from './dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  addCronJob(@Body() cronDto: CronDto) {
    const { name, seconds } = cronDto;
    return this.taskService.addCronJob(name, seconds);
  }

  @Get()
  getCronsJobs() {
    return this.taskService.getCrons();
  }

  @Delete(':name')
  removeCronJob(@Param('name') name: string) {
    return this.taskService.deleteCron(name);
  }
}
