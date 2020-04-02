import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService  {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async validate(payload: any, isNotAuthorized: Function, exception?: Error | UnauthorizedException) {
    const user = await this.validateToken(payload.email, payload.id, exception);
    if (user.role === undefined || isNotAuthorized(user))
      throw exception;
    return { id: user.id, email: user.email, role: user.role };
  }

  private async validateToken(email: string, id: number, exception): Promise<any> {
    const user = await this.usersRepository.findOne({email: email});
    if (user && user.id === id) {
      const { password, ...result } = user;
      return result;
    }
    throw exception;
  }
}