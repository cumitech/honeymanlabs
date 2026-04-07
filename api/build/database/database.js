"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("reflect-metadata");
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: `${process.env.DB_NAME}`,
    dialect: "mysql",
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    host: `${process.env.DB_HOST}`,
    ...(typeof dbPort === "number" ? { port: dbPort } : {}),
    dialectOptions: {
        connectTimeout: 3000,
    },
    models: [
        models_1.User,
        models_1.Event,
        models_1.ArticleCategory,
        models_1.NewsletterSubscriber,
        models_1.BeekeeperApplication,
        models_1.Beekeeper,
        models_1.Apiary,
        models_1.HoneyBatch,
        models_1.LabTest,
        models_1.LabResult,
        models_1.Order,
        models_1.Product,
        models_1.ProductImage,
        models_1.Session,
    ],
});
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map