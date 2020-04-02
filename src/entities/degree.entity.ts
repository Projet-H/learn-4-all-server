import { BaseEntity } from './base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import slug from 'slugify';

@Entity({ name: 'degrees' })
export class DegreeEntity extends BaseEntity{

  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => SubjectEntity, subject => subject.degree)
  subjects: SubjectEntity[];

  @BeforeInsert()
  updateSlug() {
    this.slug = slug(this.name).toLowerCase();
  }
}