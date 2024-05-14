import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';
import { Room } from './room.entity';

@Entity()
export class Floor extends Base {
  @Column()
  @AutoMap()
  key: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @OneToMany((type) => Room, (room) => room.floor, { eager: true })
  @AutoMap()
  rooms: Room[];

  @ManyToOne(() => MotelRoom, (motelRoom) => motelRoom.floor)
  @AutoMap()
  motelRoom: MotelRoom;
}
