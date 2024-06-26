import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';
import { Role } from './role.entity';
import { Banking } from './banking.entity';
import { Contract } from './contract.entity';
import { Bill } from './bill.entity';
import { Transaction } from './transaction.entity';
import { Order } from './order.entity';
import { Address } from './address.entity';

@Entity()
export class User extends Base {
  @Column({ nullable: true })
  @AutoMap()
  dob: string;

  @Column()
  @AutoMap()
  phonenumber: string;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap()
  isVerified?: boolean = false;

  @Column()
  @AutoMap()
  isActived?: boolean = false;

  @OneToMany(() => MotelRoom, (motel) => motel.owner)
  motelRooms: MotelRoom[];

  @ManyToOne(() => Role, (role) => role.user)
  @AutoMap()
  role: Role;

  @OneToMany(() => Banking, (banking) => banking.user)
  @AutoMap(() => [Banking])
  bankings: Banking[];

  @OneToMany(() => Contract, (contract) => contract.user)
  @AutoMap(() => [Contract])
  contracts: Contract[];

  @OneToMany(() => Bill, (bill) => bill.user)
  @AutoMap(() => [Bill])
  bills: Bill[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @AutoMap(() => [Transaction])
  transactions: Transaction[];

  @OneToMany(() => Order, (order) => order.user)
  @AutoMap(() => [Order])
  orders: Order[];

  @OneToOne(() => Address, (address) => address.user, { nullable: true })
  // @AutoMap(() => Address)
  @JoinColumn()
  address: Address;
}
