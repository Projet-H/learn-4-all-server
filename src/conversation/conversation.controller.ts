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

    // créer une conversation
    @Post()
    create(@Body() conversation: ConversationEntity) : Promise<ConversationEntity> {
      console.log(conversation);
      if (!conversation.teacher || ! conversation.student ) {
        throw new UnauthorizedException();
      }
      return this.conversationsRepository.save(conversation);
    }

    // récupérer toutes les conversations 
    @Get()
    getall(@Body() conversation: ConversationEntity){
        console.log(conversation);
        return this.conversationsRepository.find();
    }
    
    // récupérer une conversation
    @Get(':id')
    getone(@Param('id') conversation: ConversationEntity)
    {
        console.log(conversation);
        return this.conversationsRepository.findOne(conversation);     
    }

    // supprimer une conversation
    @Delete(':id')
    remove(@Param('id')  conversation: ConversationEntity) {
        console.log(conversation);
        return this.conversationsRepository.delete(conversation);     
    }
}
