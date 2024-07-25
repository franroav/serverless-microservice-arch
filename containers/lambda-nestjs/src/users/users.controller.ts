import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards,   HttpException, } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserDTO } from "./dto/users.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('users')
export class UsersController {


 constructor(private userService: UsersService) { }

    // @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createUsers(@Body() createUserDTO: UserDTO) {
        try{
            const response = await this.userService.createUser(createUserDTO);
            return ({ internalCode: 200, message: 'ok', payload: response })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers() {
        try{
            const response = await this.userService.getUsers();
            return ({ internalCode: 200, message: 'ok', payload: response })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/page=:page&hits=:hits')
    async refreshDatabase(@Res() res, @Param('page') page, @Param('hits') hits) {
        try{
            const article = await this.userService.getArticlesServicePromise(page, hits);
            const articleData = await this.simpleStringify(article);
            return ({ internalCode: 200, message: 'ok', payload: articleData })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/:userID')
    async getUser(@Param('userID') userID) {
        try{
            const response = await this.userService.getUser(userID);
            if (!response) throw new NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Delete('/:userID')
    async deleteUser(@Param('userID') userID) {
        try{
            const response = await this.userService.deleteUser(userID);
            if (!response) throw new NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Put('/:userID')
    async updateUser(@Body() createUserDTO: UserDTO, @Param('userID') userID) {
        try{
            const response = await this.userService.updateUser(userID, createUserDTO);
            if (!response) throw new NotFoundException('Usuario does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: response })
        }
        catch(error){
            console.log("Error: " + error.stack);
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async simpleStringify (object){
        return JSON.stringify(object.data); // returns cleaned up JSON
    };
}
