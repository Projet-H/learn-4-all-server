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

  async validate(payload: any, isNotAuthorized: Function) {
    const user = await this.validateToken(payload.email, payload.id);
    if (user.role === undefined || isNotAuthorized(user))
      throw new UnauthorizedException();
    return { id: user.id, email: user.email, role: user.role };
  }

  private async validateToken(email: string, id: number): Promise<any> {
    const user = await this.usersRepository.findOne({email: email});
    if (user && user.id === id) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}