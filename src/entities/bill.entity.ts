import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';
import { Room } from './room.entity';
import { MotelRoom } from './motel-room.entity';
import { Order } from './order.entity';
import { Banking } from './banking.entity';

@Entity()
export class Bill extends Base {
  @Column()
  @AutoMap()
  typeTaxAll: string;

  @Column()
  @AutoMap()
  totalTaxAll: string;

  @Column()
  @AutoMap()
  totalAmountWithTax: string;

  @Column()
  @AutoMap()
  dateBill: string;

  @OneToOne(() => Transaction, (transaction) => transaction.bill, { eager: true })
  @AutoMap(() => Transaction)
  transaction: Transaction;

  @ManyToOne(() => User, (user) => user.bills)
  @AutoMap(() => User)
  user: User;

  @ManyToOne(() => Room, (room) => room.bills)
  @AutoMap(() => Room)
  room: Room;

  @ManyToOne(() => MotelRoom, (motelRoom) => motelRoom.bills)
  @AutoMap(() => MotelRoom)
  motelRoom: MotelRoom;

  @OneToOne(() => Order, (order) => order.bill, { eager: true})
  @AutoMap(() => Order)
  order: Order;

  @ManyToOne(() => Banking, (banking) => banking.bills)
  @AutoMap(() => Banking)
  banking: Banking;
}