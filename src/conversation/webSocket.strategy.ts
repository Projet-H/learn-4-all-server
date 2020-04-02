import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConfigWs } from '../auth/jwt/jwt.constant';
import { ConversationService } from './conversation.service';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'webSocketStrategy') {

  constructor(
    private conversationService: ConversationService
  ) {
    super(jwtConfigWs);
  }

  async validate(payload: any) {
    return this.conversationService.checkUser(payload.id);
  }
}
