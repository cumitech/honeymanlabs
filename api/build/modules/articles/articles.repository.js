"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesRepository = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../database/models");
class ArticlesRepository {
    async findAll(language, offset, limit, status) {
        const { rows, count } = await models_1.Article.findAndCountAll({
            order: [["created_at", "DESC"]],
            where: {
                lang: language,
                ...(status ? { status } : {}),
            },
            include: [{ model: models_1.ArticleCategory, attributes: ["id", "name"] }],
            ...(typeof offset === "number" ? { offset } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
        });
        const articleIds = rows.map((row) => row.id);
        const likesByArticleId = await this.likeCountMap(articleIds);
        const commentsByArticleId = await this.commentCountMap(articleIds);
        return {
            rows: rows.map((row) => this.withCounters(row, likesByArticleId, commentsByArticleId)),
            count,
        };
    }
    async findById(id, language) {
        const row = await models_1.Article.findOne({
            where: { id, lang: language },
            include: [{ model: models_1.ArticleCategory, attributes: ["id", "name"] }],
        });
        if (!row)
            return null;
        const likesByArticleId = await this.likeCountMap([row.id]);
        const commentsByArticleId = await this.commentCountMap([row.id]);
        return this.withCounters(row, likesByArticleId, commentsByArticleId);
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
    async listComments(articleId, language) {
        return models_1.ArticleComment.findAll({
            where: { article_id: articleId, lang: language },
            include: [{ model: models_1.User, attributes: ["id", "firstname", "lastname", "avatar_url"] }],
            order: [["created_at", "DESC"]],
        });
    }
    async addComment(input) {
        return models_1.ArticleComment.create({
            article_id: input.articleId,
            user_id: input.userId,
            lang: input.language,
            content: input.content,
        });
    }
    async findLike(articleId, userId) {
        return models_1.ArticleLike.findOne({ where: { article_id: articleId, user_id: userId } });
    }
    async addLike(articleId, userId, language) {
        return models_1.ArticleLike.create({
            article_id: articleId,
            user_id: userId,
            lang: language,
        });
    }
    async removeLike(articleId, userId) {
        return models_1.ArticleLike.destroy({ where: { article_id: articleId, user_id: userId } });
    }
    async countLikes(articleId) {
        return models_1.ArticleLike.count({ where: { article_id: articleId } });
    }
    async likeCountMap(articleIds) {
        if (articleIds.length === 0)
            return new Map();
        const rows = await models_1.ArticleLike.findAll({
            attributes: ["article_id"],
            where: { article_id: { [sequelize_1.Op.in]: articleIds } },
        });
        const map = new Map();
        for (const row of rows) {
            map.set(row.article_id, (map.get(row.article_id) ?? 0) + 1);
        }
        return map;
    }
    async commentCountMap(articleIds) {
        if (articleIds.length === 0)
            return new Map();
        const rows = await models_1.ArticleComment.findAll({
            attributes: ["article_id"],
            where: { article_id: { [sequelize_1.Op.in]: articleIds } },
        });
        const map = new Map();
        for (const row of rows) {
            map.set(row.article_id, (map.get(row.article_id) ?? 0) + 1);
        }
        return map;
    }
    withCounters(row, likesByArticleId, commentsByArticleId) {
        const plain = row.toJSON();
        const category = plain.category ?? undefined;
        return {
            ...plain,
            category_name: category?.name ?? null,
            likes_count: likesByArticleId.get(row.id) ?? 0,
            comments_count: commentsByArticleId.get(row.id) ?? 0,
        };
    }
}
exports.ArticlesRepository = ArticlesRepository;
//# sourceMappingURL=articles.repository.js.map