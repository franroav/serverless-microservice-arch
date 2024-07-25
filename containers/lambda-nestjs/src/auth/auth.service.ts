import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const checkPassword = await compare(password, user.password)
    if(!checkPassword) new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED)
    if (user && checkPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    try{
        const { email, password } = user;
        const valid = await this.validateUser(email, password);
    
        if (!valid) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        }
        const {_id } = valid
        return {
          access_token: this.jwtService.sign({_id, email}),
        };
    }
    catch(error){
        console.log("Error: " + error.stack);
        throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        // throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  async register(user: any) {
    try {

        const identity = await this.usersService.getUserByEmail(user.email);
        if(identity){
            throw new HttpException(`Usuario ${user.email}registrado`, HttpStatus.CONFLICT);
        }
        const { password } = user
        const plainToHash = await hash(password, 10)
        const response: any = await this.usersService.createUser({...user, password: plainToHash})
        if(!response || response.error){
            throw new HttpException(`La creacion del usuario ${user.email} no se ha podido realizar, porfavor intentelo mas tarde`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response
      } catch (error) {
        console.log("Error: " + error.stack);
        throw new HttpException(`La creacion del usuario ${user.email} no se ha podido realizar, porfavor intentelo mas tarde`, HttpStatus.INTERNAL_SERVER_ERROR);
        // throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
