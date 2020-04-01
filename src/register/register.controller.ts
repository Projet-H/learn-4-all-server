import { Body, Controller, Post} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller('register')
export class RegisterController {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private registerService : RegisterService
  ) {}

  @Post()
  register(@Body() registerDto: RegisterDto) : Promise<UserEntity> {
    return this.registerService.register(registerDto);
  }
}
