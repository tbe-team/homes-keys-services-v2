import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date; // Creation date

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date; // Last updated date
}
