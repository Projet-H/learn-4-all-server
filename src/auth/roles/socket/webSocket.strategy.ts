import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RoleService } from '../role.service';
import { jwtConfigWs } from '../../jwt/jwt.constant';
import { UserEntity } from '../../../entities/user.entity';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'webSocketStrategy') {

  constructor(private roleService: RoleService) {
    super(jwtConfigWs);
  }

  async validate(payload: any) {
    return this.roleService.validate(payload, this.isNotAuthorized)
  }

  isNotAuthorized(user: UserEntity): boolean {
    return false;
  }
}
