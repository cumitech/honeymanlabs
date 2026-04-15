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
exports.ProductImage = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const product_model_1 = require("./product.model");
let ProductImage = class ProductImage extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.ProductImage = ProductImage;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProductImage.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], ProductImage.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "product_id"
    }),
    __metadata("design:type", String)
], ProductImage.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", product_model_1.Product)
], ProductImage.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: false,
        field: "image_url"
    }),
    __metadata("design:type", String)
], ProductImage.prototype, "image_url", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductImage]),
    __metadata("design:returntype", Promise)
], ProductImage, "assignId", null);
exports.ProductImage = ProductImage = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "product_images",
        timestamps: true,
        underscored: true
    })
], ProductImage);
//# sourceMappingURL=product_image.model.js.map