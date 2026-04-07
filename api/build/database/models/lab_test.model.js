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
exports.LabTest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_contants_1 = require("../../common/constants/app-contants");
const custom_id_1 = require("../../common/utils/custom-id");
const honey_batch_model_1 = require("./honey_batch.model");
const user_model_1 = require("./user.model");
const lab_result_model_1 = require("./lab_result.model");
let LabTest = class LabTest extends sequelize_typescript_1.Model {
    lang;
    sample_code;
    batch_id;
    batch;
    requested_by;
    requestedBy;
    test_type;
    status;
    submitted_at;
    completed_at;
    report_url;
    lab_results;
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.LabTest = LabTest;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LabTest.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_contants_1.CONTENT_LANGUAGES.EN, app_contants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_contants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], LabTest.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        field: "sample_code"
    }),
    __metadata("design:type", String)
], LabTest.prototype, "sample_code", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => honey_batch_model_1.HoneyBatch),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "batch_id"
    }),
    __metadata("design:type", String)
], LabTest.prototype, "batch_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => honey_batch_model_1.HoneyBatch),
    __metadata("design:type", honey_batch_model_1.HoneyBatch)
], LabTest.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        field: "requested_by"
    }),
    __metadata("design:type", String)
], LabTest.prototype, "requested_by", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], LabTest.prototype, "requestedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false,
        field: "test_type"
    }),
    __metadata("design:type", String)
], LabTest.prototype, "test_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false
    }),
    __metadata("design:type", String)
], LabTest.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "submitted_at"
    }),
    __metadata("design:type", Date)
], LabTest.prototype, "submitted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "completed_at"
    }),
    __metadata("design:type", Object)
], LabTest.prototype, "completed_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "report_url"
    }),
    __metadata("design:type", Object)
], LabTest.prototype, "report_url", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lab_result_model_1.LabResult),
    __metadata("design:type", Array)
], LabTest.prototype, "lab_results", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LabTest]),
    __metadata("design:returntype", Promise)
], LabTest, "assignId", null);
exports.LabTest = LabTest = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "lab_tests",
        timestamps: true,
        underscored: true
    })
], LabTest);
//# sourceMappingURL=lab_test.model.js.map