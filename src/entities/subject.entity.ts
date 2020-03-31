import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ConversationEntity } from './conversation.entity';
import { DegreeEntity } from './degree.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends BaseEntity{

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, user => user.subjects)
  user: UserEntity;

  @OneToMany(() => ConversationEntity, conversation => conversation.subject)
  conversations: ConversationEntity[];

  @ManyToOne(() => UserEntity, degree => degree.subjects)
  degree: DegreeEntity;

}