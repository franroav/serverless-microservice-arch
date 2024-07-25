import { ArticlesService } from "./articles.service";
import { CreateArticlesDTO } from "./dto/articles.dto";
export declare class ArticlesController {
    private articleService;
    constructor(articleService: ArticlesService);
    createArticles(createArticleDTO: CreateArticlesDTO): Promise<{
        internalCode: number;
        message: string;
        payload: import("./interfaces/articles.interface").Articles;
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    getArticles(): Promise<{
        internalCode: number;
        message: string;
        payload: any[];
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    refreshDatabase(res: any, page: any, hits: any): Promise<{
        internalCode: number;
        message: string;
        payload: string;
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    getArticle(articleID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    deleteArticle(res: any, articleID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    updateArticle(res: any, createArticleDTO: CreateArticlesDTO, articleID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    } | {
        internalCode: number;
        message: any;
        payload?: undefined;
    }>;
    simpleStringify(object: any): Promise<string>;
}
