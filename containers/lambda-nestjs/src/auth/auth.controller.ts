import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Body() userDto: RegisterAuthDto) {
    return this.authService.register(userDto);
  }

//   @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userDto:LoginAuthDto) {
    // return userDto
    return this.authService.login(userDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
