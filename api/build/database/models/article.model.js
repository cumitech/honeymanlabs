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
exports.Article = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const article_category_model_1 = require("./article_category.model");
const user_model_1 = require("./user.model");
let Article = class Article extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.Article = Article;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], Article.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(180),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Article.prototype, "excerpt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
        defaultValue: "draft",
    }),
    __metadata("design:type", String)
], Article.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
        field: "cover_image",
    }),
    __metadata("design:type", Object)
], Article.prototype, "cover_image", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => article_category_model_1.ArticleCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "category_id",
    }),
    __metadata("design:type", String)
], Article.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => article_category_model_1.ArticleCategory),
    __metadata("design:type", article_category_model_1.ArticleCategory)
], Article.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "author_id",
    }),
    __metadata("design:type", String)
], Article.prototype, "author_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Article.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "published_at",
    }),
    __metadata("design:type", Object)
], Article.prototype, "published_at", void 0);
__decorate([
    sequelize_typescript_1.BeforeValidate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Article]),
    __metadata("design:returntype", Promise)
], Article, "assignId", null);
exports.Article = Article = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "articles",
        timestamps: true,
        underscored: true,
    })
], Article);
//# sourceMappingURL=article.model.js.map