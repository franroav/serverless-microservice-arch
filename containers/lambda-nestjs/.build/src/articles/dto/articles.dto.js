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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleById = exports.CreateArticlesDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateArticlesDTO {
    _id;
    created_at;
    title;
    url;
    author;
    points;
    story_text;
    comment_text;
    num_comments;
    story_id;
    story_title;
    story_url;
    parent_id;
    created_at_i;
    constructor(_id, created_at, title, url, author, points, story_text, comment_text, num_comments, story_id, story_title, story_url, parent_id, created_at_i) {
        this._id = _id;
        this.created_at = created_at;
        this.title = title;
        this.url = url;
        this.author = author;
        this.points = points;
        this.story_text = story_text;
        this.comment_text = comment_text;
        this.num_comments = num_comments;
        this.story_id = story_id;
        this.story_title = story_title;
        this.story_url = story_url;
        this.parent_id = parent_id;
        this.created_at_i = created_at_i;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateArticlesDTO.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateArticlesDTO.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "story_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "comment_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateArticlesDTO.prototype, "num_comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateArticlesDTO.prototype, "story_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "story_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArticlesDTO.prototype, "story_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateArticlesDTO.prototype, "parent_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateArticlesDTO.prototype, "created_at_i", void 0);
exports.CreateArticlesDTO = CreateArticlesDTO;
class getArticleById {
    _id;
    created_at;
    title;
    url;
    author;
    points;
    story_text;
    comment_text;
    num_comments;
    story_id;
    story_title;
    story_url;
    parent_id;
    created_at_i;
}
exports.getArticleById = getArticleById;
//# sourceMappingURL=articles.dto.js.map