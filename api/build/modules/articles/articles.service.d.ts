import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesRepository, type CreateArticleData } from "./articles.repository";
export declare class ArticlesService {
    private readonly repo;
    constructor(repo: ArticlesRepository);
    list(language: "en" | "fr", offset?: number, limit?: number, status?: "draft" | "published" | "archived"): Promise<{
        rows: {
            category_name: string | null;
            likes_count: number;
            comments_count: number;
        }[];
        count: number;
    }>;
    getById(id: string, language: "en" | "fr"): Promise<{
        category_name: string | null;
        likes_count: number;
        comments_count: number;
    } | null>;
    create(auth: AuthTokenPayload, language: "en" | "fr", data: Omit<CreateArticleData, "author_id" | "lang">): Promise<import("../../database/models").Article>;
    update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>): Promise<import("../../database/models").Article | null>;
    remove(id: string): Promise<boolean>;
    listComments(articleId: string, language: "en" | "fr"): Promise<import("../../database/models").ArticleComment[]>;
    addComment(auth: AuthTokenPayload, articleId: string, language: "en" | "fr", content: string): Promise<import("../../database/models").ArticleComment>;
    toggleLike(auth: AuthTokenPayload, articleId: string, language: "en" | "fr"): Promise<{
        liked: boolean;
        likes_count: number;
    }>;
}
//# sourceMappingURL=articles.service.d.ts.map