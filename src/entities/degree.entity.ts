import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'degrees' })
export class DegreeEntity extends BaseEntity{

  @Column()
  name: string;
}