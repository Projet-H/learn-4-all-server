import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { CreateConversationDto } from './dto/createConversation.dto';
import { ConversationService } from './conversation.service';
import { WebSocketGuard } from '../auth/roles/socket/webSocket.guard';

@WebSocketGateway(Number(process.env.SOCKET_PORT))
@UseGuards(WebSocketGuard)
export class ConversationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private conversationService: ConversationService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Socket init...');
  }

  @SubscribeMessage('create-room')
  onCreateRoom(client: Socket, createRoomDto : CreateConversationDto) {
    return this.conversationService.createRoom(client, createRoomDto);
  }

  handleConnection(): any {
    console.log('connected');
  }

  handleDisconnect(): any {
    console.log('disconnected');
  }

}