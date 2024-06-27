import { AutoMap } from '@automapper/classes';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Banking } from './banking.entity';
import { Order } from './order.entity';
import { Bill } from './bill.entity';

@Entity()
export class Transaction extends Base {
  // @ManyToOne()
  // @AutoMap()
  // userId: User;

  @ManyToOne(() => Banking, (banking) => banking.transactions)
  @AutoMap(() => Banking)
  banking: Transaction;

  @Column()
  @AutoMap()
  keyPayment: string;

  @Column()
  @AutoMap()
  amount: number;

  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  status: string;

  @OneToOne(() => Order, (order) => order.transaction, { eager: true })
  @AutoMap(() => Order)
  order: Order;

  @OneToOne(() => Bill, (bill) => bill.transaction, { nullable: true })
  @AutoMap(() => Bill)
  @JoinColumn()
  bill: Bill;

  @ManyToOne(() => User, (user) => user.transactions)
  @AutoMap(() => User)
  user: User;
}