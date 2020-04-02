import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/conversation.entity';
import { ConversationGateway } from './conversation.gateway';
import { ConversationService } from './conversation.service';
import { UserEntity } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt.constant';
import { MessageEntity } from '../entities/message.entity';
import { SubjectEntity } from '../entities/subject.entity';

@Module({
  providers: [ConversationGateway, ConversationService],
  imports: [
    TypeOrmModule.forFeature([ConversationEntity,UserEntity,MessageEntity, SubjectEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  exports: [TypeOrmModule]
})
export class ConversationModule {}
