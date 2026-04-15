"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleSchema = exports.createArticleSchema = void 0;
const zod_1 = require("zod");
const app_contants_1 = require("../../common/constants/app-contants");
exports.createArticleSchema = zod_1.z.object({
    lang: zod_1.z.nativeEnum(app_contants_1.CONTENT_LANGUAGES).optional(),
    title: zod_1.z.string().min(3),
    slug: zod_1.z.string().min(3),
    excerpt: zod_1.z.string().max(300).optional(),
    content: zod_1.z.string().min(20),
    status: zod_1.z.enum(["draft", "published", "archived"]).default("draft"),
    cover_image: zod_1.z.string().url().optional(),
    category_id: zod_1.z.string().min(1),
    published_at: zod_1.z.string().datetime().optional(),
});
exports.updateArticleSchema = exports.createArticleSchema.partial();
//# sourceMappingURL=articles.schema.js.map