import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Device } from './device.entity';
import { Floor } from './floor.entity';
import { Contract } from './contract.entity';
import { Bill } from './bill.entity';

@Entity()
export class Room extends Base {
  @Column()
  @AutoMap()
  acreage: number;

  @Column()
  @AutoMap()
  status: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({ nullable: true })
  roomPassword: string;

  @OneToMany((type) => Device, (device) => device.room)
  @AutoMap(() => [Device])
  devices: Device[];

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  @AutoMap()
  floor: Floor;

  @OneToMany(() => Contract, (contract) => contract.room)
  @AutoMap(() => [Contract])
  contracts: Contract[];

  @OneToMany(() => Bill, (bill) => bill.room)
  @AutoMap(() => [Bill])
  bills: Bill[];
}
