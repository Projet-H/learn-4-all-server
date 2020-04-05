import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {
  }

  async getAllReported() {
     return await this.messageRepository.find({reported: true});
  }

  async rejectReport(messageId: number) {
    const message = await this.messageRepository.findOne(messageId);
    if(!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    message.reported = false;
    return await this.messageRepository.save(message);
  }

  async acceptReport(messageId: number) {
    const message = await this.messageRepository.findOne(messageId);
    if(!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    await this.messageRepository.delete(message);
    return {};
  }
}
