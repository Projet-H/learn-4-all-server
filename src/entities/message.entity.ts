import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ConversationEntity } from './conversation.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity{

  @Column({type: "text"})
  content: string;

  @Column({default: false})
  reported: boolean;

  @ManyToOne(() => UserEntity, user => user.messages)
  user: UserEntity;

  @ManyToOne(() => ConversationEntity, conversation => conversation.messages)
  conversation: ConversationEntity;

}