import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/conversation.entity';

@Module({
  controllers: [ConversationController],
  imports: [TypeOrmModule.forFeature([ConversationEntity])],
  exports: [TypeOrmModule]
})
export class ConversationModule {}
