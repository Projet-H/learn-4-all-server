import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../../../entities/conversation.entity';
import { Role } from '../../../enums/role.enum';

@Injectable()
export class ConversationGuard implements CanActivate {
  constructor(
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const webSocket = context.switchToWs();
    const user = webSocket.getClient().handshake.user;
    const data = webSocket.getData();
    return this.validateRequest(user, data, webSocket.getClient());
  }

  async validateRequest(user, data, socket) {
    const conversationId = data.conversationId;
    const conversation = await this.conversationRepository.findOne(conversationId, {relations: ['student', 'teacher']});
    if(!this.isAuthorized(conversation, user)) socket.emit("not-authorized", "User not allowed to read this conversation");
    return true;
  }

  isAuthorized(conversation, user) {
    return !!conversation &&
    ((user.role == Role.Student && conversation.student.id == user.id) ||
      (user.role == Role.Teacher && (!conversation.teacher || conversation.teacher.id == user.id)))
  }


}