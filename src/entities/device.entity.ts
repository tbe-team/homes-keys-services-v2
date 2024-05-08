import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Room } from './room.entity';
import { Base } from './base.entity';

@Entity()
export class Device extends Base {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  type: string;

  @AutoMap()
  @Column({ nullable: true })
  description: string;

  @AutoMap()
  @Column()
  status: 'activated' | 'deactivate';

  @AutoMap(() => Room)
  @ManyToOne(() => Room, (room) => room.devices)
  room: Room;

  @AutoMap()
  @Column()
  isGateway: boolean;

  @Column({ nullable: true })
  @AutoMap()
  location: string;
}
