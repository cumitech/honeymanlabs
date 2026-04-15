"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapArticleCategoryResponse = mapArticleCategoryResponse;
exports.mapArticleCategoryPayload = mapArticleCategoryPayload;
function mapArticleCategoryResponse(item) {
    const json = item.toJSON();
    return {
        ...json,
        title: json.name,
    };
}
function mapArticleCategoryPayload(body) {
    const title = typeof body.title === "string" ? body.title.trim() : undefined;
    return {
        ...body,
        ...(title ? { name: title } : {}),
    };
}
//# sourceMappingURL=article-categories.mapper.js.map