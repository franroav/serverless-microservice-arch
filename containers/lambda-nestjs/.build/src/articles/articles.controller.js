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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const articles_dto_1 = require("./dto/articles.dto");
let ArticlesController = class ArticlesController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async createArticles(createArticleDTO) {
        try {
            const article = await this.articleService.createArticle(createArticleDTO);
            return ({ internalCode: 200, message: 'ok', payload: article });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
        }
    }
    async getArticles() {
        try {
            const article = await this.articleService.getArticles();
            return ({ internalCode: 200, message: 'ok', payload: article });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
        }
    }
    async refreshDatabase(res, page, hits) {
        try {
            const article = await this.articleService.getArticlesServicePromise(page, hits);
            const articleData = await this.simpleStringify(article);
            return ({ internalCode: 200, message: 'ok', payload: articleData });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
        }
    }
    async getArticle(articleID) {
        try {
            const article = await this.articleService.getArticle(articleID);
            if (!article)
                throw new common_1.NotFoundException('Article does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: article });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
        }
    }
    async deleteArticle(res, articleID) {
        try {
            const articleDeleted = await this.articleService.deleteArticle(articleID);
            if (!articleDeleted)
                throw new common_1.NotFoundException('Article does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: articleDeleted });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
        }
    }
    async updateArticle(res, createArticleDTO, articleID) {
        try {
            const updatedArticle = await this.articleService.updateArticle(articleID, createArticleDTO);
            if (!updatedArticle)
                throw new common_1.NotFoundException('Article does not exist!');
            return ({ internalCode: 200, message: 'ok', payload: updatedArticle });
        }
        catch (error) {
            console.log("Error: " + error.stack);
            return ({ internalCode: 500, message: error.message });
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
    __metadata("design:paramtypes", [articles_dto_1.CreateArticlesDTO]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "createArticles", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Get)('/page=:page&hits=:hits'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('hits')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "refreshDatabase", null);
__decorate([
    (0, common_1.Get)('/:articleID'),
    __param(0, (0, common_1.Param)('articleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getArticle", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('articleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('articleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, articles_dto_1.CreateArticlesDTO, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "updateArticle", null);
ArticlesController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=articles.controller.js.map