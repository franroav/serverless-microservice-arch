import { Model } from 'mongoose';
import { Articles } from './interfaces/articles.interface';
import { CreateArticlesDTO } from './dto/articles.dto';
import { HttpService } from 'nestjs-http-promise';
export declare class ArticlesService {
    readonly articlesModel: Model<Articles>;
    private readonly httpService;
    constructor(articlesModel: Model<Articles>, httpService: HttpService);
    getArticles(): Promise<any[]>;
    getArticle(articleID: string): Promise<any>;
    createArticle(createArticleDTO: CreateArticlesDTO): Promise<Articles>;
    deleteArticle(articleID: String): Promise<any>;
    updateArticle(articleID: string, createArticleDTO: CreateArticlesDTO): Promise<any>;
    getArticlesServicePromise(page: Number, hits: Number): Promise<object>;
    validateIncomingData(data: any): void;
    insertArticlesOnDatabase(): Promise<any>;
}
