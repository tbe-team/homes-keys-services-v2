export interface ITaskService {
  handleCron(): void;
  addCronJob(name: string, seconds: string): void;
  deleteCron(name: string): void;
  getCron(name: string): void;
  addInterval(name: string, milliseconds: number): void;
  deleteInterval(name: string): void;
  getInterval(name: string): any;
  addTimeout(name: string, milliseconds: number): void;
  deleteTimeout(name: string): void;
  getTimeout(name: string): any;
}
