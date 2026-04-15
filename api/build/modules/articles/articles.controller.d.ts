import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesService } from "./articles.service";
import { createArticleSchema, updateArticleSchema } from "./articles.schema";
type AuthenticatedRequest = Request & {
    user?: AuthTokenPayload;
};
export declare class ArticlesController {
    private readonly service;
    constructor(service: ArticlesService);
    list: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: TypedRequestBody<typeof createArticleSchema> & AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: TypedRequestBody<typeof updateArticleSchema> & Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    remove: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export {};
//# sourceMappingURL=articles.controller.d.ts.map