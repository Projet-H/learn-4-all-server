import { Injectable} from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';
import { RoleService } from '../role.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConfig} from '../../jwt/jwt.constant';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {

  constructor(private roleService: RoleService) {
    super(jwtConfig);
  }

  async validate(payload: any) {
    return this.roleService.validate(payload, this.isNotAuthorized)
  }

  protected isNotAuthorized(user: UserEntity): boolean {
    return user.role != Role.Admin;
  }
}