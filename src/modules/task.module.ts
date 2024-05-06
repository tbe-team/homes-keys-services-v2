import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from '@/services';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
