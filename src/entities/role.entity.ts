import { AutoMap } from '@automapper/classes';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends Base {
  @Column({ unique: true, nullable: false })
  @AutoMap()
  roleName: string;

  @Column()
  @AutoMap()
  description: string;

  @OneToMany((type) => User, (user) => user.role)
  @AutoMap()
  user: User[];
}
