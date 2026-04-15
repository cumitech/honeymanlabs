import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesRepository, type CreateArticleData } from "./articles.repository";
export declare class ArticlesService {
    private readonly repo;
    constructor(repo: ArticlesRepository);
    list(language: "en" | "fr", offset?: number, limit?: number): Promise<{
        rows: import("../../database/models").Article[];
        count: number;
    }>;
    getById(id: string, language: "en" | "fr"): Promise<import("../../database/models").Article | null>;
    create(auth: AuthTokenPayload, language: "en" | "fr", data: Omit<CreateArticleData, "author_id" | "lang">): Promise<import("../../database/models").Article>;
    update(id: string, language: "en" | "fr", data: Partial<CreateArticleData>): Promise<import("../../database/models").Article | null>;
    remove(id: string): Promise<boolean>;
}
//# sourceMappingURL=articles.service.d.ts.map