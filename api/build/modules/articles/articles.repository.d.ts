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
export declare class ArticlesRepository {
    findAll(language: "en" | "fr", offset?: number, limit?: number): Promise<{
        rows: Article[];
        count: number;
    }>;
    findById(id: string, language: "en" | "fr"): Promise<Article | null>;
    create(data: CreateArticleData): Promise<Article>;
    update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>): Promise<Article | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=articles.repository.d.ts.map