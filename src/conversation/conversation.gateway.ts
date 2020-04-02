import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtSocketGuard } from './jwtSocket.guard';
import { CreateRoomDto } from './dto/createRoom.dto';
import { ConversationService } from './conversation.service';

@WebSocketGateway(Number(process.env.SOCKET_PORT))
@UseGuards(JwtSocketGuard)
export class ConversationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  conversationService : ConversationService;
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Socket init...');
  }

  @SubscribeMessage('create-room')
  async onCreateRoom(client: Socket, createRoomDto : CreateRoomDto) {
    this.conversationService.createRoom(client, createRoomDto);
    console.log(createRoomDto, client.handshake);
    //client.broadcast.emit('chat', message);
  }

  handleConnection(): any {
    console.log('connected');
  }

  handleDisconnect(): any {
    console.log('disconnected');
  }

}