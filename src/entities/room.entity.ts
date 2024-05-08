import { AutoMap } from '@automapper/classes';
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
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  acreage: number;

  @Column()
  @AutoMap()
  status: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({ nullable: true })
  roomPassword: string;

  @OneToMany((type) => Device, (device) => device.room)
  @AutoMap(() => [Device])
  devices: Device[];

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  @AutoMap()
  floor: Floor;
}
