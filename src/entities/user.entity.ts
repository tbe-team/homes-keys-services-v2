import { AutoMap } from '@automapper/classes';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  dob: string;

  @Column()
  @AutoMap()
  phonenumber: string;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  password: string;

  @Column()
  @AutoMap()
  isVerified: boolean;

  @Column()
  @AutoMap()
  isActived: boolean;

  @OneToMany((type) => MotelRoom, (motel) => motel.owner)
  @AutoMap()
  motelRooms: MotelRoom[];
}
