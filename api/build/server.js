"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database/database");
const config_1 = require("./config");
const start = async () => {
    try {
        await database_1.sequelize.authenticate();
        if (config_1.env.DB_SYNC) {
            await database_1.sequelize.sync();
        }
    }
    catch (err) {
        if (config_1.env.REQUIRE_DB)
            throw err;
        console.warn("Database unavailable, starting server anyway.");
    }
    app_1.default.listen(config_1.appConfig.port, () => {
        console.log(`Server listening on port ${config_1.appConfig.port}`);
    });
};
start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map