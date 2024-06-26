import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Contract extends Base {
  @Column()
  @AutoMap()
  isCompleted: boolean;

  @Column()
  @AutoMap()
  isActivated: boolean;

  @Column()
  @AutoMap()
  rentalPeriod: number;

  @Column()
  @AutoMap()
  status: string;

  // @Column()
  // @AutoMap()
  // isDeleted: boolean;

  @Column()
  @AutoMap()
  checkInTime: Date;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  bail: number;

  @Column()
  @AutoMap()
  deposit: number;

  @Column()
  @AutoMap()
  afterCheckInCost: number;

  @ManyToOne(() => User, (user) => user.contracts)
  @AutoMap(() => User)
  user: User;

  @ManyToOne(() => Room, (room) => room.contracts)
  @AutoMap(() => Room)
  room: Room;

  @OneToMany(() => Order, (order) => order.contract)
  @AutoMap(() => [Order])
  orders: Order[];
}