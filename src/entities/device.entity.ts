import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Room } from './room.entity';

@Entity()
export class Device extends Base {
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
