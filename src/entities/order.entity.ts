import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Contract } from './contract.entity';
import { OrderItem } from './order-item.entity';
import { Transaction } from './transaction.entity';
import { Bill } from './bill.entity';

@Entity()
export class Order extends Base {
  @Column()
  @AutoMap()
  isCompleted: boolean;

  @Column()
  @AutoMap()
  amount: number;

  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  type: string;

  @Column()
  @AutoMap()
  idOrder: string;

  @Column()
  @AutoMap()
  isCurrentOrder: boolean;

  @Column()
  @AutoMap()
  startTime: Date;

  @Column()
  @AutoMap()
  endTime: Date;
  
  @Column()
  @AutoMap()
  expireTime: Date;
  
  @ManyToOne(() => User, (user) => user.orders)
  @AutoMap(() => User)
  user: User;

  @ManyToOne(() => Contract, (contract) => contract.orders)
  @AutoMap(() => Contract)
  contract: Contract;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @AutoMap(() => [OrderItem])
  orderItems: OrderItem[];

  @OneToOne(() => Transaction, (transaction) => transaction.order, { nullable: true })
  @AutoMap(() => Transaction)
  @JoinColumn()
  transaction: Transaction;

  @OneToOne(() => Bill, (bill) => bill.order, { nullable: true})
  @AutoMap(() => Bill)
  @JoinColumn()
  bill: Bill;
}