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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const article_comment_model_1 = require("./article-comment.model");
const article_like_model_1 = require("./article-like.model");
const cart_item_model_1 = require("./cart-item.model");
const wishlist_item_model_1 = require("./wishlist-item.model");
let User = class User extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], User.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "google_sub", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "facebook_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.USER_ROLES.ADMIN, app_constants_1.USER_ROLES.CUSTOMER, app_constants_1.USER_ROLES.BEEKEEPER, app_constants_1.USER_ROLES.LAB_STAFF),
        defaultValue: app_constants_1.USER_ROLES.CUSTOMER,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_method", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(16),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_client", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_device_label", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(512),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_user_agent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_sign_in_ip", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "sign_in_count", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_item_model_1.CartItem),
    __metadata("design:type", Array)
], User.prototype, "cart_items", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => wishlist_item_model_1.WishlistItem),
    __metadata("design:type", Array)
], User.prototype, "wishlist_items", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => article_comment_model_1.ArticleComment),
    __metadata("design:type", Array)
], User.prototype, "article_comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => article_like_model_1.ArticleLike),
    __metadata("design:type", Array)
], User.prototype, "article_likes", void 0);
__decorate([
    sequelize_typescript_1.BeforeValidate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "assignId", null);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: true,
        underscored: true
    })
], User);
//# sourceMappingURL=user.model.js.map