"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
class ArticlesService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(language, offset, limit, status) {
        return this.repo.findAll(language, offset, limit, status);
    }
    async getById(id, language) {
        return this.repo.findById(id, language);
    }
    async create(auth, language, data) {
        return this.repo.create({
            ...data,
            lang: language,
            author_id: auth.userId,
            published_at: data.published_at ?? null,
        });
    }
    async update(id, language, data) {
        return this.repo.update(id, language, { ...data, lang: language });
    }
    async remove(id) {
        return this.repo.delete(id);
    }
    async listComments(articleId, language) {
        return this.repo.listComments(articleId, language);
    }
    async addComment(auth, articleId, language, content) {
        return this.repo.addComment({
            articleId,
            userId: auth.userId,
            language,
            content,
        });
    }
    async toggleLike(auth, articleId, language) {
        const existing = await this.repo.findLike(articleId, auth.userId);
        if (existing) {
            await this.repo.removeLike(articleId, auth.userId);
            const count = await this.repo.countLikes(articleId);
            return { liked: false, likes_count: count };
        }
        await this.repo.addLike(articleId, auth.userId, language);
        const count = await this.repo.countLikes(articleId);
        return { liked: true, likes_count: count };
    }
}
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map