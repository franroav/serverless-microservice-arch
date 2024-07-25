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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const nestjs_http_promise_1 = require("nestjs-http-promise");
const config = require("../config/config");
const nbPages = 20;
let ArticlesService = class ArticlesService {
    articlesModel;
    httpService;
    constructor(articlesModel, httpService) {
        this.articlesModel = articlesModel;
        this.httpService = httpService;
    }
    async getArticles() {
        try {
            const data = await this.articlesModel.find();
            const articles = [{ name: 'francisco ' }];
            return data;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getArticle(articleID) {
        try {
            const article = await this.articlesModel.findById(articleID);
            return article;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createArticle(createArticleDTO) {
        try {
            const newArticle = new this.articlesModel(createArticleDTO);
            return newArticle.save();
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteArticle(articleID) {
        try {
            const deletedArticle = await this.articlesModel.findOneAndDelete(articleID);
            return deletedArticle;
        }
        catch (error) {
            console.log('Error: ' + error.stack);
            throw new common_1.HttpException(error.stack, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateArticle(articleID, createArticleDTO) {
        try {
            const updatedArticle = await this.articlesModel.findByIdAndUpdate(articleID, createArticleDTO, { new: true });
            return updatedArticle;
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
        console.log({ response: data });
    }
    async insertArticlesOnDatabase() {
        const data = {};
        return data;
    }
};
ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Articles')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        nestjs_http_promise_1.HttpService])
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map