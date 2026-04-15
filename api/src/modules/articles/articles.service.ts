import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesRepository, type CreateArticleData } from "./articles.repository";

export class ArticlesService {
  constructor(private readonly repo: ArticlesRepository) {}

  async list(language: "en" | "fr", offset?: number, limit?: number) {
    return this.repo.findAll(language, offset, limit);
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
}
