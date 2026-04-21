import { Article, ArticleComment, ArticleLike } from "../../database/models";
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
export declare class ArticlesRepository {
    findAll(language: "en" | "fr", offset?: number, limit?: number, status?: "draft" | "published" | "archived"): Promise<{
        rows: {
            category_name: string | null;
            likes_count: number;
            comments_count: number;
        }[];
        count: number;
    }>;
    findById(id: string, language: "en" | "fr"): Promise<{
        category_name: string | null;
        likes_count: number;
        comments_count: number;
    } | null>;
    create(data: CreateArticleData): Promise<Article>;
    update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>): Promise<Article | null>;
    delete(id: string): Promise<boolean>;
    listComments(articleId: string, language: "en" | "fr"): Promise<ArticleComment[]>;
    addComment(input: {
        articleId: string;
        userId: string;
        language: "en" | "fr";
        content: string;
    }): Promise<ArticleComment>;
    findLike(articleId: string, userId: string): Promise<ArticleLike | null>;
    addLike(articleId: string, userId: string, language: "en" | "fr"): Promise<ArticleLike>;
    removeLike(articleId: string, userId: string): Promise<number>;
    countLikes(articleId: string): Promise<number>;
    private likeCountMap;
    private commentCountMap;
    private withCounters;
}
//# sourceMappingURL=articles.repository.d.ts.map