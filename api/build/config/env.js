"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const EnvSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    DB_HOST: zod_1.z.string().min(1),
    DB_NAME: zod_1.z.string().min(1),
    DB_USER: zod_1.z.string().min(1),
    DB_PASS: zod_1.z.string().optional().default(""),
    JWT_SECRET: zod_1.z.string().min(1),
    //sync database models on startup
    DB_SYNC: zod_1.z.coerce.boolean().optional().default(false),
    //require database authentication to start the server
    REQUIRE_DB: zod_1.z.coerce.boolean().optional().default(false),
});
exports.env = EnvSchema.parse(process.env);
//# sourceMappingURL=env.js.map