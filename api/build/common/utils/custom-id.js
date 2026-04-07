"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomIdForModel = generateCustomIdForModel;
const sequelize_1 = require("sequelize");
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() -
        start.getTime() -
        (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function toInitials(tableName) {
    const cleaned = tableName.replace(/[^a-zA-Z0-9_]/g, "");
    const parts = cleaned.split("_").filter(Boolean);
    if (parts.length === 0)
        return "ID";
    if (parts.length === 1)
        return parts[0].slice(0, 2).toUpperCase();
    return parts.map((p) => p[0]).join("").toUpperCase();
}
async function generateCustomIdForModel(modelClass) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const dayOfYear = getDayOfYear(now).toString().padStart(3, "0");
    const tableName = modelClass.getTableName?.() ?? modelClass.tableName ?? modelClass.name;
    const tableNameStr = typeof tableName === "object" && tableName ? tableName.tableName : String(tableName);
    const initials = toInitials(tableNameStr);
    const prefix = `${initials}${year}${dayOfYear}`;
    const last = await modelClass.findOne({
        where: {
            id: { [sequelize_1.Op.like]: `${prefix}%` },
        },
        order: [["id", "DESC"]],
    });
    const lastSuffix = last?.id ? parseInt(String(last.id).slice(prefix.length), 10) : 0;
    const next = lastSuffix + 1;
    return `${prefix}${next.toString().padStart(4, "0")}`;
}
//# sourceMappingURL=custom-id.js.map