import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { ConversationEntity } from './conversation.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity{
  @Column()
  slug: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column({default: false})
  isConnected: boolean;

  @OneToMany(() => SubjectEntity, subject => subject.user)
  subjects: SubjectEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.teacher)
  conversationWithStudents: ConversationEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.student)
  conversationWithTeachers: ConversationEntity[];
}