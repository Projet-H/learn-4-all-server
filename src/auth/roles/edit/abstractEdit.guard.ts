import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from '../../../entities/user.entity';

export abstract class AbstractEditGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request) {
    const editId = request.params.id;
    const userConnected = request.user;
    return editId && this.canEdit(editId, userConnected);
  }

  protected abstract canEdit(editId: number, userConnected: UserEntity): boolean;

}