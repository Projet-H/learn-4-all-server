import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../entities/conversation.entity';
import { Socket } from 'socket.io';
import { CreateConversationDto } from './dto/createConversation.dto';
import { JoinConversationDto } from './dto/joinConversation.dto';
import { Role } from '../enums/role.enum';
import { SendMessageDto } from './dto/sendMessage.dto';
import { GetConversationsDto } from './dto/getConversations.dto';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,

    @InjectRepository(ConversationEntity)
    private messageRepository: Repository<MessageEntity>
  )
  {}

  async createConversation(client : Socket, createConversationDto : CreateConversationDto) {
      const conversation = new ConversationEntity();
      conversation.student = client.handshake.user;
      Object.assign(conversation, createConversationDto);
      await this.conversationRepository.save(conversation);
      client.join(conversation.id);
      client.emit('create-room-response', conversation);
  }

  async joinConversation(client : Socket, joinConversationDto : JoinConversationDto) {
      const conversation = await this.conversationRepository.findOne(joinConversationDto.id, {relations: ['teacher', 'messages']});
      if(!conversation.teacher && client.handshake.user.role == Role.Teacher) {
        conversation.teacher = client.handshake.user;
        await this.conversationRepository.save(conversation);
      }
      client.join(conversation.id);
      client.emit('join-conversation-response', conversation);
      client.to(conversation.id).emit('user-joined-conversation', client.handshake.user);
  }

  async sendMessage(client: Socket, sendMessageDto: SendMessageDto) {
      const conversation = await this.conversationRepository.findOne(sendMessageDto.conversationId);
      const message = new MessageEntity();
      delete sendMessageDto.conversationId;
      message.user = client.handshake.user;
      message.conversation = conversation;
      Object.assign(message, sendMessageDto);
      await this.messageRepository.save(conversation);
      client.to(conversation.id).emit('sent-message', message);
  }

  async getConversations(client: Socket, getConversationsDto : GetConversationsDto) {
    const user = client.handshake.user;
    let conversations;
    if(user.role == Role.Student) {
      conversations = await this.queryGetConversationsStudent(getConversationsDto, user);
    } else {
      conversations = await this.queryGetAllConversations(getConversationsDto);
    }
    client.emit('get-conversations-response', conversations);
  }

  queryGetConversationsStudent(getConversationsDto: GetConversationsDto, user: UserEntity) {
    return this.conversationRepository.find({
      student: { id: user.id },
      subject: {
        slug: getConversationsDto.subjectSlug,
        degree: { slug: getConversationsDto.degreeSlug }
      }
    });
  }

  queryGetAllConversations(getConversationsDto: GetConversationsDto) {
    return this.conversationRepository.find({
      subject: {
        slug: getConversationsDto.subjectSlug,
        degree: { slug: getConversationsDto.degreeSlug }
      }
    });
  }
}