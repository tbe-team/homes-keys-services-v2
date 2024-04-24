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
export class Floor extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((type) => Room, (room) => room.floor)
  rooms: Room[];

  @ManyToOne(() => MotelRoom, (motelRoom) => motelRoom.floor)
  motelRoom: MotelRoom;
}
