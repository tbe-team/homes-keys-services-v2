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
import { User } from './user.entity';

@Entity()
export class MotelRoom extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  minPrice: number;

  @Column()
  maxPrice: number;

  @Column()
  contactPhone: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((type) => Floor, (floor) => floor.motelRoom)
  floor: Floor[];

  @ManyToOne(() => User, (user) => user.motelRooms)
  owner: User;
}
