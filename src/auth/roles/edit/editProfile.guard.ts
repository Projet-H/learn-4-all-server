import { Injectable } from '@nestjs/common';
import { Role } from '../../../enums/role.enum';
import { AbstractEditGuard } from './abstractEdit.guard';
import { UserEntity } from '../../../entities/user.entity';

@Injectable()
export class EditProfileGuard extends AbstractEditGuard {

  protected canEdit(editId: number, userConnected: UserEntity): boolean {
    return editId == userConnected.id || userConnected.role == Role.Admin;
  }
}