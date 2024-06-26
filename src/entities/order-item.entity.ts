import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends Base {
  @Column()
  @AutoMap()
  expenseType: string;

  @Column()
  @AutoMap()
  quantity: string

  @Column()
  @AutoMap()
  unitPrice: string;

  @Column()
  @AutoMap()
  total: string;

  // @OneToOne()
  // @AutoMap()
  // billId: // nullable

  @Column()
  @AutoMap()
  detail: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @AutoMap(() => Order)
  order: Order;
}
