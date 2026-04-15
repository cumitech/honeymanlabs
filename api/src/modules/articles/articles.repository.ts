import { Article } from "../../database/models";

export type CreateArticleData = {
  lang?: "en" | "fr";
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: "draft" | "published" | "archived";
  cover_image?: string;
  category_id: string;
  author_id: string;
  published_at?: Date | null;
};

export class ArticlesRepository {
  async findAll(language: "en" | "fr", offset?: number, limit?: number) {
    return Article.findAndCountAll({
      order: [["created_at", "DESC"]],
      where: { lang: language },
      ...(typeof offset === "number" ? { offset } : {}),
      ...(typeof limit === "number" ? { limit } : {}),
    });
  }

  async findById(id: string, language: "en" | "fr") {
    return Article.findOne({ where: { id, lang: language } });
  }

  async create(data: CreateArticleData) {
    return Article.create(data);
  }

  async update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>) {
    const article = await Article.findOne({ where: { id, lang: language } });
    if (!article) return null;
    await article.update(data);
    return article;
  }

  async delete(id: string) {
    const article = await Article.findByPk(id);
    if (!article) return false;
    await article.destroy();
    return true;
  }
}
