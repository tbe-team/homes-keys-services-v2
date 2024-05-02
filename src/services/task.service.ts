import { ITaskService } from '@/interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService implements ITaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('Called every 10 seconds');
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCron(name: string): CronJob<null, null> {
    const job = this.schedulerRegistry.getCronJob(name);
    return job;
  }

  addInterval(name: string, milliseconds: number): void {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  deleteInterval(name: string): void {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  getInterval(name: string): any {
    const interval = this.schedulerRegistry.getInterval(name);
    return interval;
  }

  addTimeout(name: string, milliseconds: number): void {
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };

    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  deleteTimeout(name: string): void {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted!`);
  }

  getTimeout(name: string): any {
    const timeout = this.schedulerRegistry.getTimeout(name);
    return timeout;
  }
}
