import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Users } from './interfaces/users.interface';
import { UserDTO } from './dto/users.dto';
import { HttpService } from 'nestjs-http-promise'; //'@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as config from '../config/config';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') public readonly usersModel: Model<Users>,
    private readonly httpService: HttpService,
  ) {}

  // Get all articles
  async getUsers(): Promise<any[]> {
    try {
       const data = await this.usersModel.find();
      return data;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get a single article
  async getUser(userID: string): Promise<any> {
    try {
      const user = await this.usersModel.findById(userID);
      return user;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.usersModel.findOne({email});
      return user;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Post a single article
  async createUser(createUserDTO: UserDTO): Promise<Users> {
    try {
      const newUser = new this.usersModel(createUserDTO);
      return newUser.save();
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete article
  async deleteUser(userID: String): Promise<any> {
    try {
      const deleteUser = await this.usersModel.findOneAndDelete(
        userID,
      );
      return deleteUser;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Put a single article
  async updateUser(
    userID: string,
    createUserDTO: UserDTO,
  ): Promise<any> {
    try {
      const updatedUser = await this.usersModel.findByIdAndUpdate(
        userID,
        createUserDTO,
        { new: true },
      );
      return updatedUser;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getArticlesServicePromise(page: Number, hits: Number): Promise<object> {
    try {
      return this.httpService.get(
        config.default.develoment.serviceUrl +
          `tags=story&query=nodejs&page=${page}&hitsPerPage=${hits}`,
      );
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  validateIncomingData(data) {
    // console.log({ response: data });
  }

  async insertArticlesOnDatabase(): Promise<any> {
    const data = {};
    return data;
  }
}
