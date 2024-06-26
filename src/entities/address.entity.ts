import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';
import { User } from './user.entity';

@Entity()
export class Address extends Base {
  @Column()
  @AutoMap()
  address: string;

  @Column()
  @AutoMap()
  components: string;

  @Column()
  @AutoMap()
  geometry: string;

  @Column()
  @AutoMap()
  placeId: string;

  @Column()
  @AutoMap()
  plusCode: string;

  @OneToOne(() => MotelRoom, (motelRoom) => motelRoom.address, { eager: true })
  @AutoMap(() => MotelRoom)
  motelRoom: MotelRoom;

  @OneToOne(() => User, (user) => user.address, { eager: true })
  // @AutoMap(() => User)
  user: User;
}