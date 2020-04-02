import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../entities/conversation.entity';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateRoomDto } from './dto/createRoom.dto';

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

  async createRoom(client : Socket, createRoomDto : CreateRoomDto) {

  }
}
