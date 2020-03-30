import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ConversationEntity } from './conversation.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity{

  @Column({type: "varchar"})
  content: string;

  @ManyToOne(() => ConversationEntity, conversation => conversation.messages)
  conversation: ConversationEntity;
}