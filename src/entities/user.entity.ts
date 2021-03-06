import { BaseEntity } from './base.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { ConversationEntity } from './conversation.entity';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { MessageEntity } from './message.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity{
  @Column({unique: true})
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

  @ManyToMany(() => SubjectEntity,{cascade: ["update"]})
  @JoinTable()
  subjects: SubjectEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.teacher)
  conversationWithStudents: ConversationEntity[];

  @OneToMany(() => ConversationEntity, conversation => conversation.student)
  conversationWithTeachers: ConversationEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}