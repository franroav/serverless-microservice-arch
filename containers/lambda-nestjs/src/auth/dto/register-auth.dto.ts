import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    // @IsNotEmpty()
    // email: string;
    // password: string;
}