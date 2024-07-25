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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./dto/users.dto");
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createUsers(createUserDTO) {
        try {
            const response = await this.userService.createUser(createUserDTO);
            return ({ internalCode: 200, message: 'ok', payload: response });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUsers() {
        try {
            const response = await this.userService.getUsers();
            return ({ internalCode: 200, message: 'ok', payload: response });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refreshDatabase(res, page, hits) {
        try {
            const article = await this.userService.getArticlesServicePromise(page, hits);
            const articleData = await this.simpleStringify(article);
            return ({ internalCode: 200, message: 'ok', payload: articleData });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUser(userID) {
        try {
            const response = await this.userService.getUser(userID);
            if (!response)
                throw new common_1.NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(userID) {
        try {
            const response = await this.userService.deleteUser(userID);
            if (!response)
                throw new common_1.NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(createUserDTO, userID) {
        try {
            const response = await this.userService.updateUser(userID, createUserDTO);
            if (!response)
                throw new common_1.NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async simpleStringify(object) {
        return JSON.stringify(object.data);
    }
    ;
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/page=:page&hits=:hits'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('hits')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refreshDatabase", null);
__decorate([
    (0, common_1.Get)('/:userID'),
    __param(0, (0, common_1.Param)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)('/:userID'),
    __param(0, (0, common_1.Param)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('/:userID'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map