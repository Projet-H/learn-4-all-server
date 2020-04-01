import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { AuthDto } from './auth.dto';


@Controller('auth/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}