import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { MotelRoom } from './motel-room.entity';
import { Role } from './role.entity';

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

  @OneToMany((type) => MotelRoom, (motel) => motel.owner)
  @AutoMap()
  motelRooms: MotelRoom[];

  @Column()
  isAdmin: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  @AutoMap()
  role: Role;
}
