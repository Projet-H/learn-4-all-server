import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/conversation.entity';
import { ConversationGateway } from './conversation.gateway';
import { ConversationService } from './conversation.service';
import { UserEntity } from '../entities/user.entity';
import { WebSocketStrategy } from './webSocket.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt.constant';

@Module({
  controllers: [ConversationController],
  providers: [ConversationGateway, ConversationService, WebSocketStrategy],
  imports: [
    TypeOrmModule.forFeature([ConversationEntity,UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  exports: [TypeOrmModule]
})
export class ConversationModule {}
