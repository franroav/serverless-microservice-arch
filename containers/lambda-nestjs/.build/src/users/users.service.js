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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const nestjs_http_promise_1 = require("nestjs-http-promise");
const config = require("../config/config");
let UsersService = class UsersService {
    usersModel;
    httpService;
    constructor(usersModel, httpService) {
        this.usersModel = usersModel;
        this.httpService = httpService;
    }
    async getUsers() {
        try {
            const data = await this.usersModel.find();
            return data;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUser(userID) {
        try {
            const user = await this.usersModel.findById(userID);
            return user;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.usersModel.findOne({ email });
            return user;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(createUserDTO) {
        try {
            const newUser = new this.usersModel(createUserDTO);
            return newUser.save();
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(userID) {
        try {
            const deleteUser = await this.usersModel.findOneAndDelete(userID);
            return deleteUser;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(userID, createUserDTO) {
        try {
            const updatedUser = await this.usersModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
            return updatedUser;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getArticlesServicePromise(page, hits) {
        try {
            return this.httpService.get(config.default.develoment.serviceUrl +
                `tags=story&query=nodejs&page=${page}&hitsPerPage=${hits}`);
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    validateIncomingData(data) {
    }
    async insertArticlesOnDatabase() {
        const data = {};
        return data;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        nestjs_http_promise_1.HttpService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map