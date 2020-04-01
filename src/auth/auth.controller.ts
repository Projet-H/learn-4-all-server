import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Body, Req} from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { AuthDto } from './auth.dto';
import { UserAuthGuard } from './roles/user/user.guard';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('auth/logout')
  @UseGuards(UserAuthGuard)
  async logout(@Req() request) {
    return this.authService.logout(request);
  }
}