import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RoleService } from '../role.service';
import { jwtConfigWs } from '../../jwt/jwt.constant';
import { UserEntity } from '../../../entities/user.entity';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'webSocketStrategy') {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super(jwtConfigWs);
  }

  async validate(payload: any) {
    const user = this.usersRepository.findOne(payload.id);
    if(!user) {
      throw new WsException('Unauthorized');
    }
    return user;
  }
}
