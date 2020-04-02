import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './register.dto';
import slug from 'slugify';
import { EmailExistsException } from './exceptions/emailExists.exception';
import { Role } from '../enums/role.enum';

@Injectable()
export class RegisterService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new EmailExistsException(existingUser.email);
    }

    const user = new UserEntity();
    Object.assign(user, registerDto);
    user.role = Role.NONE;
    user.slug = slug(user.firstName.concat(' ', user.lastName)).toLowerCase();
    return this.userRepository.save(user);
  }
}