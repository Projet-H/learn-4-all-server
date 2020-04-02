import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RoleService } from '../role.service';
import { jwtConfigWs } from '../../jwt/jwt.constant';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'webSocketStrategy') {

  constructor(private roleService: RoleService) {
    super(jwtConfigWs);
  }

  async validate(payload: any) {
    return this.roleService.validate(payload, this.isNotAuthorized)
  }

  isNotAuthorized(): boolean {
    return false;
  }

  protected getException() : any {
    return new WsException("Wrong id");
  }
}
