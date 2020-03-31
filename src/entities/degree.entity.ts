import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';

@Entity({ name: 'degrees' })
export class DegreeEntity extends BaseEntity{

  @Column()
  name: string;

  @OneToMany(() => SubjectEntity, subject => subject.degree)
  subjects: SubjectEntity[];
}