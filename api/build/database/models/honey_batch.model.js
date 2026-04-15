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
exports.HoneyBatch = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_contants_1 = require("../../common/constants/app-contants");
const custom_id_1 = require("../../common/utils/custom-id");
const beekeeper_model_1 = require("./beekeeper.model");
const apiary_model_1 = require("./apiary.model");
const lab_test_model_1 = require("./lab_test.model");
let HoneyBatch = class HoneyBatch extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.HoneyBatch = HoneyBatch;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_contants_1.CONTENT_LANGUAGES.EN, app_contants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_contants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        unique: true,
        field: "batch_code",
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "batch_code", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => beekeeper_model_1.Beekeeper),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "beekeeper_id",
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "beekeeper_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => beekeeper_model_1.Beekeeper),
    __metadata("design:type", beekeeper_model_1.Beekeeper)
], HoneyBatch.prototype, "beekeeper", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => apiary_model_1.Apiary),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(32), allowNull: false, field: "apiary_id" }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "apiary_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => apiary_model_1.Apiary),
    __metadata("design:type", apiary_model_1.Apiary)
], HoneyBatch.prototype, "apiary", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false, field: "harvest_date" }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "harvest_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(120),
        allowNull: false,
        field: "floral_source",
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "floral_source", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(5, 2),
        allowNull: false,
        field: "moisture_content",
    }),
    __metadata("design:type", Number)
], HoneyBatch.prototype, "moisture_content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false,
        field: "certification_status",
    }),
    __metadata("design:type", String)
], HoneyBatch.prototype, "certification_status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lab_test_model_1.LabTest),
    __metadata("design:type", Array)
], HoneyBatch.prototype, "lab_tests", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HoneyBatch]),
    __metadata("design:returntype", Promise)
], HoneyBatch, "assignId", null);
exports.HoneyBatch = HoneyBatch = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "honey_batches",
        timestamps: true,
        underscored: true,
    })
], HoneyBatch);
//# sourceMappingURL=honey_batch.model.js.map