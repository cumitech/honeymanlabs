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
exports.BeekeeperApplication = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const app_contants_1 = require("../../common/constants/app-contants");
const custom_id_1 = require("../../common/utils/custom-id");
let BeekeeperApplication = class BeekeeperApplication extends sequelize_typescript_1.Model {
    lang;
    name;
    region;
    phone;
    experience;
    number_of_hives;
    status;
    submitted_at;
    static async assignId(instance) {
        if (instance.id)
            return;
        instance.id = await (0, custom_id_1.generateCustomIdForModel)(this);
    }
};
exports.BeekeeperApplication = BeekeeperApplication;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(app_contants_1.CONTENT_LANGUAGES.EN, app_contants_1.CONTENT_LANGUAGES.FR),
        allowNull: false,
        defaultValue: app_contants_1.CONTENT_LANGUAGES.EN,
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "lang", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(120),
        allowNull: false
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], BeekeeperApplication.prototype, "experience", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "number_of_hives"
    }),
    __metadata("design:type", Number)
], BeekeeperApplication.prototype, "number_of_hives", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false
    }),
    __metadata("design:type", String)
], BeekeeperApplication.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "submitted_at"
    }),
    __metadata("design:type", Date)
], BeekeeperApplication.prototype, "submitted_at", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BeekeeperApplication]),
    __metadata("design:returntype", Promise)
], BeekeeperApplication, "assignId", null);
exports.BeekeeperApplication = BeekeeperApplication = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "beekeeper_applications",
        timestamps: true,
        underscored: true
    })
], BeekeeperApplication);
//# sourceMappingURL=beekeeper_application.model.js.map