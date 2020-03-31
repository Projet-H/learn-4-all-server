import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { UserEntity } from '../entities/user.entity';
import { AuthDto } from './auth.dto';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}