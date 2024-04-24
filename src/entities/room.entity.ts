import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  acreage: number;

  @Column()
  status: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  roomPassword: string;

  @OneToMany((type) => Device, (device) => device.room)
  devices: Device[];
}
