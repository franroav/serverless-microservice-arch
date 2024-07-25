"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const login_auth_dto_1 = require("./login-auth.dto");
class RegisterAuthDto extends (0, swagger_1.PartialType)(login_auth_dto_1.LoginAuthDto) {
}
exports.RegisterAuthDto = RegisterAuthDto;
//# sourceMappingURL=register-auth.dto.js.map