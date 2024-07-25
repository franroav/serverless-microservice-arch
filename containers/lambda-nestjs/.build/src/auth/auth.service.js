"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.getUserByEmail(email);
        const checkPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!checkPassword)
            new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.UNAUTHORIZED);
        if (user && checkPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        try {
            const { email, password } = user;
            const valid = await this.validateUser(email, password);
            if (!valid) {
                throw new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.UNAUTHORIZED);
            }
            const { _id } = valid;
            return {
                access_token: this.jwtService.sign({ _id, email }),
            };
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async register(user) {
        try {
            const identity = await this.usersService.getUserByEmail(user.email);
            if (identity) {
                throw new common_1.HttpException(`Usuario ${user.email}registrado`, common_1.HttpStatus.CONFLICT);
            }
            const { password } = user;
            const plainToHash = await (0, bcrypt_1.hash)(password, 10);
            const response = await this.usersService.createUser({ ...user, password: plainToHash });
            if (!response || response.error) {
                throw new common_1.HttpException(`La creacion del usuario ${user.email} no se ha podido realizar, porfavor intentelo mas tarde`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return response;
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(`La creacion del usuario ${user.email} no se ha podido realizar, porfavor intentelo mas tarde`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map