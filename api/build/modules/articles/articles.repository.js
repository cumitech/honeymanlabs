"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesRepository = void 0;
const models_1 = require("../../database/models");
class ArticlesRepository {
    async findAll(language, offset, limit) {
        return models_1.Article.findAndCountAll({
            order: [["created_at", "DESC"]],
            where: { lang: language },
            ...(typeof offset === "number" ? { offset } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
        });
    }
    async findById(id, language) {
        return models_1.Article.findOne({ where: { id, lang: language } });
    }
    async create(data) {
        return models_1.Article.create(data);
    }
    async update(id, language, data) {
        const article = await models_1.Article.findOne({ where: { id, lang: language } });
        if (!article)
            return null;
        await article.update(data);
        return article;
    }
    async delete(id) {
        const article = await models_1.Article.findByPk(id);
        if (!article)
            return false;
        await article.destroy();
        return true;
    }
}
exports.ArticlesRepository = ArticlesRepository;
//# sourceMappingURL=articles.repository.js.map