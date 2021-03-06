import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../entities/conversation.entity';
import { Socket, Server } from 'socket.io';
import { CreateConversationDto } from './dto/createConversation.dto';
import { JoinConversationDto } from './dto/joinConversation.dto';
import { Role } from '../enums/role.enum';
import { SendMessageDto } from './dto/sendMessage.dto';
import { GetConversationsDto } from './dto/getConversations.dto';
import { MessageEntity } from '../entities/message.entity';
import { SubjectEntity } from '../entities/subject.entity';
import { ReportMessageDto } from './dto/reportMessage.dto';
import { GetConversationDto } from './dto/getConversation.dto';

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
      if(!subject) return client.emit('not-found', 'Subject not found');
      Object.assign(conversation, createConversationDto);
      conversation.subject = subject;
      conversation.student = client.handshake.user;
      await this.conversationRepository.save(conversation);
      client.join(conversation.id);
      client.emit('create-conversation-response', conversation);
  }

  async joinConversation(client : Socket, joinConversationDto : JoinConversationDto) {
      const conversation = await this.conversationRepository.findOne(joinConversationDto.conversationId, {relations: ['teacher', 'messages']});
      if(!conversation.teacher && client.handshake.user.role == Role.Teacher) {
        conversation.teacher = client.handshake.user;
        await this.conversationRepository.save(conversation);
      }
      client.join(conversation.id);
      client.emit('join-conversation-response', conversation);
      client.to(conversation.id).emit('user-joined-conversation', client.handshake.user);
  }

  async sendMessage(client: Socket, sendMessageDto: SendMessageDto, server: Server) {
      const conversation = await this.conversationRepository.findOne(sendMessageDto.conversationId);
      const message = new MessageEntity();
      message.user = client.handshake.user;
      message.conversation = conversation;
      Object.assign(message, sendMessageDto);
      await this.messageRepository.save(message);
      server.in(conversation.id).emit('sent-message', message);
  }

  async reportMessage(client: Socket, reportMessage: ReportMessageDto) {
    const message: MessageEntity = await this.messageRepository.findOne(reportMessage.id, {relations: ['conversation']});
    message.reported = true;
    await this.messageRepository.save(message);
    client.to(message.conversation.id).emit('report-message', message);
  }

  async getConversations(client: Socket, getConversationsDto : GetConversationsDto) {
    const user = client.handshake.user;
    let conversations;
    if(user.role == Role.Student) {
      conversations = await this.queryGetAllConversationsStudent(getConversationsDto, user);
    } else {
      conversations = await this.queryGetAllConversations(getConversationsDto, user);
    }
    client.emit('get-conversations-response', conversations);
  }

  async getConversation(client: Socket, getConversationDto : GetConversationDto) {
    const conversation: ConversationEntity = await this.conversationRepository.findOne(getConversationDto.conversationId);
    const messages: MessageEntity[] = await this.messageRepository.find({
      where: { conversation: conversation },
      order: {createDateTime: 'ASC'},
      relations: ['user', 'conversation']});
    client.emit('get-conversation-response', messages);
  }

  queryGetAllConversationsStudent(getConversationsDto: GetConversationsDto, user: UserEntity) {
    return this.conversationRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.student", "u")
      .leftJoinAndSelect("c.teacher", "t")
      .innerJoin("c.subject", "s", "s.slug = :subjectSlug", {subjectSlug: getConversationsDto.subjectSlug})
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: getConversationsDto.degreeSlug})
      .where("u.id = :userId", {userId: user.id})
      .getMany();
  }
  
  queryGetAllConversations(getConversationsDto: GetConversationsDto, user: UserEntity) {
    return this.conversationRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.student", "u")
      .leftJoinAndSelect("c.teacher", "t")
      .innerJoin("c.subject", "s", "s.slug = :subjectSlug", {subjectSlug: getConversationsDto.subjectSlug})
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: getConversationsDto.degreeSlug})
      .where("t.id = :userId", {userId: user.id})
      .orWhere("t.id IS NULL")
      .getMany();
  }

  queryFindSubject(createConversationDto: CreateConversationDto) {
    return this.subjectRepository.createQueryBuilder("s")
      .innerJoin("s.degree", "d", "d.slug = :degreeSlug", {degreeSlug: createConversationDto.degreeSlug})
      .where("s.slug = :subjectSlug", {subjectSlug: createConversationDto.subjectSlug})
      .getOne();
  }
}