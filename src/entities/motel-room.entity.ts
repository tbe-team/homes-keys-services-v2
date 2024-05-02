import { AutoMap } from '@automapper/classes';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { Floor } from './floor.entity';
import { User } from './user.entity';

@Entity()
export class MotelRoom extends Base {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  minPrice: number;

  @Column()
  @AutoMap()
  maxPrice: number;

  @Column()
  @AutoMap()
  contactPhone: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @OneToMany((type) => Floor, (floor) => floor.motelRoom)
  @AutoMap()
  floor: Floor[];

  @ManyToOne(() => User, (user) => user.motelRooms)
  @AutoMap()
  owner: User;
}
