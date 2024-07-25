import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userDto: RegisterAuthDto): Promise<any>;
    login(userDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
}
