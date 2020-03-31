import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Controller('register')
export class RegisterController {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Post()
  register(@Body() user: UserEntity) : Promise<UserEntity> {
    console.log(user);
    return this.usersRepository.save(user);
  }
}
