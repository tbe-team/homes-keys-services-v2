import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Room } from './room.entity';

@Entity()
export class Device {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  type: number;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  status: 'activated' | 'deactivate';

  @ManyToOne(() => Room, (room) => room.devices)
  room: Room;
}
