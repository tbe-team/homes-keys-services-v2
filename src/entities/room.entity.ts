import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { Device } from './device.entity';
import { Floor } from './floor.entity';

@Entity()
export class Room extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  acreage: number;

  @Column()
  status: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  roomPassword: string;

  @OneToMany((type) => Device, (device) => device.room)
  devices: Device[];

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  floor: Floor;
}
