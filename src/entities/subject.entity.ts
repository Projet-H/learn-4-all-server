import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';
import { ConversationEntity } from './conversation.entity';
import { DegreeEntity } from './degree.entity';
import slug from 'slugify';

@Entity({ name: 'subjects' })
export class SubjectEntity extends BaseEntity{
  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => ConversationEntity, conversation => conversation.subject)
  conversations: ConversationEntity[];

  @ManyToOne(() => DegreeEntity, degree => degree.subjects)
  degree: DegreeEntity;

  @BeforeInsert()
  updateSlug() {
    this.slug = slug(this.slug).toLowerCase();
  }

}