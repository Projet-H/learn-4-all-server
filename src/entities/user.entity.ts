import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { ConversationEntity } from './conversation.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity{

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column({unique: true})
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
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