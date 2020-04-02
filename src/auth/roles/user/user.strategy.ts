import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';
import { RoleService } from '../role.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConfig} from '../../jwt/jwt.constant';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {

  constructor(private roleService: RoleService) {
    super(jwtConfig);
  }

  async validate(payload: any) {
    return this.roleService.validate(payload, this.isNotAuthorized, new UnauthorizedException())
  }

  protected isNotAuthorized(user: UserEntity): boolean {
    return false;
  }
}