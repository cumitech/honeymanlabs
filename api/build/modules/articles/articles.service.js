"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
class ArticlesService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(language, offset, limit) {
        return this.repo.findAll(language, offset, limit);
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
}
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map