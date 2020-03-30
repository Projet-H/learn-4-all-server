import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity{

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}