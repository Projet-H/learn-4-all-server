import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { SubjectEntity } from './subject.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'conversations' })
export class ConversationEntity extends BaseEntity{

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => SubjectEntity, subject => subject.conversations)
  subject: SubjectEntity;

  @ManyToOne(() => UserEntity, user => user.conversationWithStudents)
  teacher: UserEntity;

  @ManyToOne(() => UserEntity, user => user.conversationWithTeachers)
  student: UserEntity;

  @OneToMany(() => MessageEntity, message => message.conversation)
  messages: MessageEntity[];
}