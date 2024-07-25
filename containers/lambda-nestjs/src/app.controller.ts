import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { RegisterAuthDto } from './auth/dto/register-auth.dto'
import { LoginAuthDto } from './auth/dto/login-auth.dto'
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
ApiTags('auth')
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
//, private authService: AuthService
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // // @UseGuards(LocalAuthGuard)
  // @Post('register')
  // async register(@Body() userDto: RegisterAuthDto) {
  //   return this.authService.login(userDto);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Body() userDto:LoginAuthDto) {
  //   return this.authService.login(userDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
