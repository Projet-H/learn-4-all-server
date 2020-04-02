import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { CreateConversationDto } from './dto/createConversation.dto';
import { ConversationService } from './conversation.service';
import { WebSocketGuard } from '../auth/roles/socket/webSocket.guard';
import { JoinConversationDto } from './dto/joinConversation.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { GetConversationsDto } from './dto/getConversations.dto';

@WebSocketGateway(Number(process.env.SOCKET_PORT))
@UseGuards(WebSocketGuard)
export class ConversationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private conversationService: ConversationService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Socket init...');
  }

  @SubscribeMessage('create-conversation')
  onCreateConversation(client: Socket, createConversationDto : CreateConversationDto) {
    return this.conversationService.createConversation(client, createConversationDto);
  }

  @SubscribeMessage('join-conversation')
  onJoinConversation(client: Socket, joinConversationDto : JoinConversationDto) {
    return this.conversationService.joinConversation(client, joinConversationDto);
  }

  @SubscribeMessage('send-message')
  onSendMessageConversation(client: Socket, sendMessageDto : SendMessageDto) {
    return this.conversationService.sendMessage(client, sendMessageDto);
  }

  @SubscribeMessage('get-conversations')
  onGetConversations(client: Socket, getConversationsDto: GetConversationsDto) {
    return this.conversationService.getConversations(client, getConversationsDto);
  }

  handleConnection(): any {
    console.log('connected');
  }

  handleDisconnect(): any {
    console.log('disconnected');
  }
}