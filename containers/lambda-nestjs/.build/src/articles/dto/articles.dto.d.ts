declare class CreateArticlesDTO {
    readonly _id?: string;
    readonly created_at: Date;
    readonly title: string;
    readonly url: string;
    readonly author: string;
    readonly points: number;
    readonly story_text: string;
    readonly comment_text: string;
    readonly num_comments: number;
    readonly story_id: number;
    readonly story_title: string;
    readonly story_url: string;
    readonly parent_id: number;
    readonly created_at_i: number;
    constructor(_id: string, created_at: Date, title: string, url: string, author: string, points: number, story_text: string, comment_text: string, num_comments: number, story_id: number, story_title: string, story_url: string, parent_id: number, created_at_i: number);
}
declare class getArticleById {
    _id: string;
    readonly created_at: Date;
    readonly title: string;
    readonly url: string;
    readonly author: string;
    readonly points: number;
    readonly story_text: null;
    readonly comment_text: string;
    readonly num_comments: number;
    readonly story_id: number;
    readonly story_title: string;
    readonly story_url: string;
    readonly parent_id: number;
    readonly created_at_i: number;
}
export { CreateArticlesDTO, getArticleById };
