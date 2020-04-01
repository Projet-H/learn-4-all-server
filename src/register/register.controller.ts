import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { UserAuthGuard } from '../auth/roles/user/user.guard';
import { TeacherAuthGuard } from '../auth/roles/teacher/teacher.guard';

@Controller('register')
export class RegisterController {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private registerService : RegisterService
  ) {}

  @Post()
  @UseGuards(TeacherAuthGuard)
  register(@Body() registerDto: RegisterDto) : Promise<UserEntity> {
    return this.registerService.register(registerDto);
  }
}
