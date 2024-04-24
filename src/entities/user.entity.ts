import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';
import { Room } from './room.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dob: string;

  @Column()
  phonenumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isVerified: boolean;

  @Column()
  isActived: boolean;

  @OneToMany((type) => MotelRoom, (motel) => motel.owner)
  motelRooms: MotelRoom[];
}
