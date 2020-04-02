import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../entities/conversation.entity';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateConversationDto } from './dto/createConversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>
  )
  {}

  async checkUser(userId: number) {
    const user = this.userRepository.findOne(userId);
    if(!user) {
      throw new WsException('Unauthorized');
    }
    return user;
  }

  async createRoom(client : Socket, createConversationDto : CreateConversationDto) {
      const conversation = new ConversationEntity();
      Object.assign(conversation, createConversationDto);
      await this.userRepository.save(conversation);
      client.join(conversation.title);
      client.emit('create-room-response', conversation);
  }
}
