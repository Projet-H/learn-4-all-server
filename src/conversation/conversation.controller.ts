import { Controller, Post, Body, Param, Delete, UnauthorizedException, Get } from '@nestjs/common';
import { ConversationEntity } from 'src/entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('conversation')
export class ConversationController {

    constructor(
        @InjectRepository(ConversationEntity)
        private conversationsRepository: Repository<ConversationEntity>,
    ){}

    @Post()
    create(@Body() conversation: ConversationEntity) : Promise<ConversationEntity> {
      if (!conversation.teacher || ! conversation.student ) {
        throw new UnauthorizedException();
      }
      return this.conversationsRepository.save(conversation);
    }

    @Get()
    getall(@Body() conversation: ConversationEntity){
        return this.conversationsRepository.find();
    }

    @Get(':id')
    getone(@Param('id') conversation: ConversationEntity) {
        return this.conversationsRepository.findOne(conversation);     
    }

    @Delete(':id')
    remove(@Param('id')  conversation: ConversationEntity) {
        return this.conversationsRepository.delete(conversation);     
    }
}
