import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ConversationEntity } from './conversation.entity';
import { DegreeEntity } from './degree.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends BaseEntity{

  @Column()
  name: string;

  @OneToMany(() => ConversationEntity, conversation => conversation.subject)
  conversations: ConversationEntity[];

  @ManyToOne(() => DegreeEntity, degree => degree.subjects)
  degree: DegreeEntity;
}