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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_types_1 = require("../../common/constants/product-types");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const cart_item_model_1 = require("./cart-item.model");
const product_category_model_1 = require("./product-category.model");
const product_image_model_1 = require("./product_image.model");
const product_sub_category_model_1 = require("./product-sub-category.model");
const wishlist_item_model_1 = require("./wishlist-item.model");
let Product = class Product extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], Product.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        allowNull: false, unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_category_model_1.ProductCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "category_id",
    }),
    __metadata("design:type", String)
], Product.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_category_model_1.ProductCategory),
    __metadata("design:type", product_category_model_1.ProductCategory)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_sub_category_model_1.ProductSubCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: true,
        field: "sub_category_id",
    }),
    __metadata("design:type", Object)
], Product.prototype, "sub_category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_sub_category_model_1.ProductSubCategory),
    __metadata("design:type", Object)
], Product.prototype, "sub_category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "stock_quantity"
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock_quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false,
        field: "origin_region"
    }),
    __metadata("design:type", String)
], Product.prototype, "origin_region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: false,
        field: "featured_image"
    }),
    __metadata("design:type", String)
], Product.prototype, "featured_image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...product_types_1.MEASUREMENT_TYPES),
        allowNull: false,
        defaultValue: "MASS",
        field: "measurement_type",
    }),
    __metadata("design:type", String)
], Product.prototype, "measurement_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...product_types_1.MEASUREMENT_UNITS),
        allowNull: false,
        defaultValue: "GRAM",
        field: "measurement_unit",
    }),
    __metadata("design:type", String)
], Product.prototype, "measurement_unit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
        field: "measurement_value",
    }),
    __metadata("design:type", String)
], Product.prototype, "measurement_value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(12, 3),
        allowNull: true,
        field: "net_grams",
    }),
    __metadata("design:type", Object)
], Product.prototype, "net_grams", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(12, 3),
        allowNull: true,
        field: "net_milliliters",
    }),
    __metadata("design:type", Object)
], Product.prototype, "net_milliliters", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
        field: "attributes",
    }),
    __metadata("design:type", Object)
], Product.prototype, "attributes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...product_types_1.APPAREL_SIZES),
        allowNull: true,
        field: "apparel_size",
    }),
    __metadata("design:type", Object)
], Product.prototype, "apparel_size", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_image_model_1.ProductImage),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_item_model_1.CartItem),
    __metadata("design:type", Array)
], Product.prototype, "cart_items", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => wishlist_item_model_1.WishlistItem),
    __metadata("design:type", Array)
], Product.prototype, "wishlist_items", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product]),
    __metadata("design:returntype", Promise)
], Product, "assignId", null);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "products",
        timestamps: true,
        underscored: true
    })
], Product);
//# sourceMappingURL=product.model.js.map