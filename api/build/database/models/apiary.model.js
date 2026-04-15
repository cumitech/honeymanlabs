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
exports.Apiary = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const beekeeper_model_1 = require("./beekeeper.model");
let Apiary = class Apiary extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.Apiary = Apiary;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Apiary.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], Apiary.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => beekeeper_model_1.Beekeeper),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "beekeeper_id"
    }),
    __metadata("design:type", String)
], Apiary.prototype, "beekeeper_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => beekeeper_model_1.Beekeeper),
    __metadata("design:type", beekeeper_model_1.Beekeeper)
], Apiary.prototype, "beekeeper", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(120),
        allowNull: false
    }),
    __metadata("design:type", String)
], Apiary.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 6),
        allowNull: false
    }),
    __metadata("design:type", Number)
], Apiary.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 6),
        allowNull: false
    }),
    __metadata("design:type", Number)
], Apiary.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], Apiary.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "number_of_hives"
    }),
    __metadata("design:type", Number)
], Apiary.prototype, "number_of_hives", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => require("./honey_batch.model").HoneyBatch),
    __metadata("design:type", Array)
], Apiary.prototype, "honey_batches", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Apiary]),
    __metadata("design:returntype", Promise)
], Apiary, "assignId", null);
exports.Apiary = Apiary = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "apiaries",
        timestamps: true,
        underscored: true
    })
], Apiary);
//# sourceMappingURL=apiary.model.js.map