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
exports.LabResult = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_constants_1 = require("../../common/constants/app-constants");
const custom_id_1 = require("../../common/utils/custom-id");
const lab_test_model_1 = require("./lab_test.model");
let LabResult = class LabResult extends sequelize_typescript_1.Model {
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.LabResult = LabResult;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LabResult.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_constants_1.CONTENT_LANGUAGES.EN, app_constants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_constants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], LabResult.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lab_test_model_1.LabTest),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false, field: "lab_test_id"
    }),
    __metadata("design:type", String)
], LabResult.prototype, "lab_test_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lab_test_model_1.LabTest),
    __metadata("design:type", lab_test_model_1.LabTest)
], LabResult.prototype, "lab_test", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false
    }),
    __metadata("design:type", String)
], LabResult.prototype, "parameter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(12, 4),
        allowNull: false
    }),
    __metadata("design:type", Number)
], LabResult.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false
    }),
    __metadata("design:type", String)
], LabResult.prototype, "unit", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LabResult]),
    __metadata("design:returntype", Promise)
], LabResult, "assignId", null);
exports.LabResult = LabResult = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "lab_results",
        timestamps: true,
        underscored: true
    })
], LabResult);
//# sourceMappingURL=lab_result.model.js.map