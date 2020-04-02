import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConfigWs } from '../../jwt/jwt.constant';
import { UserEntity } from '../../../entities/user.entity';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role.service';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'webSocketStrategy') {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private roleService: RoleService
  ) {
    super(jwtConfigWs);
  }

  async validate(payload: any) {
    return this.roleService.validate(payload, this.isNotAuthorized, new WsException("Unauthorized"))
  }

  isNotAuthorized(user: UserEntity): boolean {
    return false;
  }
}
