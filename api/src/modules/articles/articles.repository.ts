import { Op } from "sequelize";
import { Article, ArticleCategory, ArticleComment, ArticleLike, User } from "../../database/models";

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
  async findAll(
    language: "en" | "fr",
    offset?: number,
    limit?: number,
    status?: "draft" | "published" | "archived",
  ) {
    const { rows, count } = await Article.findAndCountAll({
      order: [["created_at", "DESC"]],
      where: {
        lang: language,
        ...(status ? { status } : {}),
      },
      include: [{ model: ArticleCategory, attributes: ["id", "name"] }],
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

  async findById(id: string, language: "en" | "fr") {
    const row = await Article.findOne({
      where: { id, lang: language },
      include: [{ model: ArticleCategory, attributes: ["id", "name"] }],
    });
    if (!row) return null;
    const likesByArticleId = await this.likeCountMap([row.id]);
    const commentsByArticleId = await this.commentCountMap([row.id]);
    return this.withCounters(row, likesByArticleId, commentsByArticleId);
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

  async listComments(articleId: string, language: "en" | "fr") {
    return ArticleComment.findAll({
      where: { article_id: articleId, lang: language },
      include: [{ model: User, attributes: ["id", "firstname", "lastname", "avatar_url"] }],
      order: [["created_at", "DESC"]],
    });
  }

  async addComment(input: {
    articleId: string;
    userId: string;
    language: "en" | "fr";
    content: string;
  }) {
    return ArticleComment.create({
      article_id: input.articleId,
      user_id: input.userId,
      lang: input.language,
      content: input.content,
    });
  }

  async findLike(articleId: string, userId: string) {
    return ArticleLike.findOne({ where: { article_id: articleId, user_id: userId } });
  }

  async addLike(articleId: string, userId: string, language: "en" | "fr") {
    return ArticleLike.create({
      article_id: articleId,
      user_id: userId,
      lang: language,
    });
  }

  async removeLike(articleId: string, userId: string) {
    return ArticleLike.destroy({ where: { article_id: articleId, user_id: userId } });
  }

  async countLikes(articleId: string) {
    return ArticleLike.count({ where: { article_id: articleId } });
  }

  private async likeCountMap(articleIds: string[]) {
    if (articleIds.length === 0) return new Map<string, number>();
    const rows = await ArticleLike.findAll({
      attributes: ["article_id"],
      where: { article_id: { [Op.in]: articleIds } },
    });
    const map = new Map<string, number>();
    for (const row of rows) {
      map.set(row.article_id, (map.get(row.article_id) ?? 0) + 1);
    }
    return map;
  }

  private async commentCountMap(articleIds: string[]) {
    if (articleIds.length === 0) return new Map<string, number>();
    const rows = await ArticleComment.findAll({
      attributes: ["article_id"],
      where: { article_id: { [Op.in]: articleIds } },
    });
    const map = new Map<string, number>();
    for (const row of rows) {
      map.set(row.article_id, (map.get(row.article_id) ?? 0) + 1);
    }
    return map;
  }

  private withCounters(
    row: Article,
    likesByArticleId: Map<string, number>,
    commentsByArticleId: Map<string, number>,
  ) {
    const plain = row.toJSON() as Record<string, unknown>;
    const category = (plain.category as { name?: string } | undefined) ?? undefined;
    return {
      ...plain,
      category_name: category?.name ?? null,
      likes_count: likesByArticleId.get(row.id) ?? 0,
      comments_count: commentsByArticleId.get(row.id) ?? 0,
    };
  }
}
