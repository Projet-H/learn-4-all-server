import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import slug from 'slugify';

@Controller('register')
export class RegisterController {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Post()
  register(@Body() user: UserEntity) : Promise<UserEntity> {
    user.slug = slug(user.firstName.concat(' ',user.lastName)).toLowerCase();
    return this.usersRepository.save(user);
  }
}
