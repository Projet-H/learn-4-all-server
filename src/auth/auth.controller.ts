import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { UserEntity } from '../entities/user.entity';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserEntity) {
    return this.authService.login(user);
  }
}