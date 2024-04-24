import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @AutoMap()
  @CreateDateColumn()
  createdAt: Date; // Creation date

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date; // Last updated date
}
