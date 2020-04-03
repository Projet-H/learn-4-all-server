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
import { SubjectEntity } from '../entities/subject.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,

    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,

    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>
  )
  {}

  async createConversation(client : Socket, createConversationDto : CreateConversationDto) {
      const conversation = new ConversationEntity();
      const subject = await this.queryFindSubject(createConversationDto);
      if(!subject) return client.emit('error-create-conversation', 'Subject not found');
      Object.assign(conversation, createConversationDto);
      conversation.subject = subject;
      conversation.student = client.handshake.user;
      await this.conversationRepository.save(conversation);
      client.join(conversation.id);
      client.emit('create-conversation-response', conversation);
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
      conversations = await this.queryGetAllConversationsStudent(getConversationsDto, user);
    } else {
      conversations = await this.queryGetAllConversations(getConversationsDto);
    }
    client.emit('get-conversations-response', conversations);
  }

  queryGetAllConversationsStudent(getConversationsDto: GetConversationsDto, user: UserEntity) {
    return this.conversationRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.student", "u")
      .innerJoin("c.subject", "s", "s.slug = :subjectSlug", {subjectSlug: getConversationsDto.subjectSlug})
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: getConversationsDto.degreeSlug})
      .where("u.id = :userId", {userId: user.id})
      .getMany();
  }

  queryGetAllConversations(getConversationsDto: GetConversationsDto) {
    return this.conversationRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.student", "u")
      .innerJoin("c.subject", "s", "s.slug = :subjectSlug", {subjectSlug: getConversationsDto.subjectSlug})
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: getConversationsDto.degreeSlug})
      .getMany();
  }

  queryFindSubject(createConversationDto: CreateConversationDto) {
    return this.subjectRepository.createQueryBuilder("s")
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: createConversationDto.degreeSlug})
      .where("s.slug = :subjectSlug", {subjectSlug: createConversationDto.subjectSlug})
      .getOne();
  }
}