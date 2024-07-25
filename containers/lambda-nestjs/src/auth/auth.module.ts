import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service'
import { HttpModule } from 'nestjs-http-promise'//'@nestjs/axios';
import { JwtService } from '@nestjs/jwt'; 
import { HttpService } from 'nestjs-http-promise'; //'@nestjs/axios';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schema/users.schema';
// PassportModule,
@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Users', schema: UserSchema}]),
    UsersModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600' },
    }),
  ],
  controllers: [AuthController], 
  providers: [ UsersService, AuthService, LocalStrategy, JwtStrategy],
  // providers: [HttpService, JwtService, UsersService, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
