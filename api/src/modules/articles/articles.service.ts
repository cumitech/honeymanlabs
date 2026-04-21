import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesRepository, type CreateArticleData } from "./articles.repository";

export class ArticlesService {
  constructor(private readonly repo: ArticlesRepository) {}

  async list(
    language: "en" | "fr",
    offset?: number,
    limit?: number,
    status?: "draft" | "published" | "archived",
  ) {
    return this.repo.findAll(language, offset, limit, status);
  }

  async getById(id: string, language: "en" | "fr") {
    return this.repo.findById(id, language);
  }

  async create(
    auth: AuthTokenPayload,
    language: "en" | "fr",
    data: Omit<CreateArticleData, "author_id" | "lang">,
  ) {
    return this.repo.create({
      ...data,
      lang: language,
      author_id: auth.userId,
      published_at: data.published_at ?? null,
    });
  }

  async update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>) {
    return this.repo.update(id, language, { ...data, lang: language });
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }

  async listComments(articleId: string, language: "en" | "fr") {
    return this.repo.listComments(articleId, language);
  }

  async addComment(
    auth: AuthTokenPayload,
    articleId: string,
    language: "en" | "fr",
    content: string,
  ) {
    return this.repo.addComment({
      articleId,
      userId: auth.userId,
      language,
      content,
    });
  }

  async toggleLike(auth: AuthTokenPayload, articleId: string, language: "en" | "fr") {
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
