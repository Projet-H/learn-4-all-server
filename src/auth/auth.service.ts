
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
    const user = await this.usersRepository.findOne({email: authDto.email});
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}