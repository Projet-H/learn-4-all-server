
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async login(authDto: AuthDto) {
    let user = await this.usersRepository.findOne({email: authDto.email});
    user = await this.setConnected(user, true);
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async logout(request) {
    const user = await this.usersRepository.findOne({email: request.user.email});
    return this.setConnected(user, false);
  }

  private async setConnected(user: UserEntity, isConnected: boolean): Promise<UserEntity> {
    user.isConnected = isConnected;
    return this.usersRepository.save(user);
  }
}