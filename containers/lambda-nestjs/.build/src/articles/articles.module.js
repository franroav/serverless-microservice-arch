"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../app.controller");
const app_service_1 = require("../app.service");
const articles_controller_1 = require("./articles.controller");
const articles_service_1 = require("./articles.service");
const mongoose_1 = require("@nestjs/mongoose");
const articles_schema_1 = require("./schemas/articles.schema");
const nestjs_http_promise_1 = require("nestjs-http-promise");
let ArticlesModule = class ArticlesModule {
};
ArticlesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_http_promise_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: 'Articles', schema: articles_schema_1.ArticleSchema }])],
        controllers: [app_controller_1.AppController, articles_controller_1.ArticlesController],
        providers: [app_service_1.AppService, articles_service_1.ArticlesService]
    })
], ArticlesModule);
exports.ArticlesModule = ArticlesModule;
//# sourceMappingURL=articles.module.js.map