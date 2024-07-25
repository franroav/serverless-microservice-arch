import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Articles } from './interfaces/articles.interface';
import { CreateArticlesDTO } from './dto/articles.dto';
import { HttpService } from 'nestjs-http-promise'; //'@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as config from '../config/config';

const nbPages = 20;
@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Articles') public readonly articlesModel: Model<Articles>,
    private readonly httpService: HttpService,
  ) {}

  // Get all articles
  async getArticles(): Promise<any[]> {
    try {
       const data = await this.articlesModel.find();
      const articles = [{name: 'francisco '}]
      return data;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get a single article
  async getArticle(articleID: string): Promise<any> {
    try {
      const article = await this.articlesModel.findById(articleID);
      return article;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Post a single article
  async createArticle(createArticleDTO: CreateArticlesDTO): Promise<Articles> {
    try {
      const newArticle = new this.articlesModel(createArticleDTO);
      return newArticle.save();
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete article
  async deleteArticle(articleID: String): Promise<any> {
    try {
      const deletedArticle = await this.articlesModel.findOneAndDelete(
        articleID,
      );
      return deletedArticle;
    } catch (error) {
      console.log('Error: ' + error.stack);
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Put a single article
  async updateArticle(
    articleID: string,
    createArticleDTO: CreateArticlesDTO,
  ): Promise<any> {
    try {
      const updatedArticle = await this.articlesModel.findByIdAndUpdate(
        articleID,
        createArticleDTO,
        { new: true },
      );
      return updatedArticle;
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
    console.log({ response: data });
  }

  async insertArticlesOnDatabase(): Promise<any> {
    const data = {};
    return data;
  }
}
