import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { Floor } from './floor.entity';
import { User } from './user.entity';
import { Bill } from './bill.entity';
import { Address } from './address.entity';

@Entity()
export class MotelRoom extends Base {
  @Column()
  @AutoMap()
  minPrice: number;

  @Column()
  @AutoMap()
  maxPrice: number;

  @Column()
  @AutoMap()
  contactPhone: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @OneToMany((type) => Floor, (floor) => floor.motelRoom)
  @AutoMap()
  floor: Floor[];

  @ManyToOne(() => User, (user) => user.motelRooms)
  @AutoMap()
  owner: User;

  @OneToMany(() => Bill, (bill) => bill.motelRoom)
  @AutoMap(() => [Bill])
  bills: Bill[];

  @OneToOne(() => Address, (address) => address.motelRoom)
  @AutoMap(() => Address)
  @JoinColumn()
  address: Address;
}
