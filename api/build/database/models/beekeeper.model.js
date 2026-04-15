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
exports.Beekeeper = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_contants_1 = require("../../common/constants/app-contants");
const custom_id_1 = require("../../common/utils/custom-id");
const user_model_1 = require("./user.model");
const apiary_model_1 = require("./apiary.model");
const honey_batch_model_1 = require("./honey_batch.model");
let Beekeeper = class Beekeeper extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.Beekeeper = Beekeeper;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_contants_1.CONTENT_LANGUAGES.EN, app_contants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_contants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "user_id"
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Beekeeper.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(120),
        allowNull: false
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
        field: "farm_location"
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "farm_location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "years_experience"
    }),
    __metadata("design:type", Number)
], Beekeeper.prototype, "years_experience", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: "certification_status"
    }),
    __metadata("design:type", String)
], Beekeeper.prototype, "certification_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        field: "bio"
    }),
    __metadata("design:type", Object)
], Beekeeper.prototype, "bio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "created_at"
    }),
    __metadata("design:type", Date)
], Beekeeper.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => apiary_model_1.Apiary),
    __metadata("design:type", Array)
], Beekeeper.prototype, "apiaries", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => honey_batch_model_1.HoneyBatch),
    __metadata("design:type", Array)
], Beekeeper.prototype, "honey_batches", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Beekeeper]),
    __metadata("design:returntype", Promise)
], Beekeeper, "assignId", null);
exports.Beekeeper = Beekeeper = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "beekeepers",
        timestamps: true,
        underscored: true
    })
], Beekeeper);
//# sourceMappingURL=beekeeper.model.js.map