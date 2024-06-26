import { AutoMap } from '@automapper/classes';
import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { Bill } from './bill.entity';

@Entity()
export class Banking extends Base {
  @ManyToOne(() => User, (user) => user.bankings)
  @AutoMap(() => User)
  user: User;

  @Column()
  @AutoMap()
  bank: string;

  @Column()
  @AutoMap()
  branch: string;

  @Column()
  @AutoMap()
  bankUserName: string;

  @Column()
  @AutoMap()
  bankAccountNumber: string;

  @Column()
  @AutoMap()
  bankName: string;

  // @OneToOne(() => )
  // @AutoMap()
  // image: 

  @OneToMany(() => Transaction, (transaction) => transaction.banking)
  @AutoMap(() => [Transaction])
  transactions: Transaction[];

  @OneToMany(() => Bill, (bill) => bill.banking)
  @AutoMap(() => [Bill])
  bills: Bill[];
}