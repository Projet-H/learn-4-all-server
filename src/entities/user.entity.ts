import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { ConversationEntity } from './conversation.entity';

@Entity({ name: 'users' })
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

  @Column({type: "boolean"})
  isConnected: boolean;

  @Column({type: "boolean"})
  isTeatcher: boolean;

  @Column({type: "boolean"})
  isStudent: boolean;

  @OneToMany(() => SubjectEntity, subject => subject.user)
  subjects: SubjectEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.teacher)
  conversationWithStudents: ConversationEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.student)
  conversationWithTeachers: ConversationEntity[];
}