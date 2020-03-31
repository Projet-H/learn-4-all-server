import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './register.dto';
import slug from 'slugify';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  register(registerDto: RegisterDto) : Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, registerDto);
    user.slug = slug(user.firstName.concat(' ',user.lastName)).toLowerCase();
    return this.userRepository.save(user);
  }
}