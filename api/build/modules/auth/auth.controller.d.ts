import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register: (req: TypedRequestBody<typeof registerSchema>, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: TypedRequestBody<typeof loginSchema>, res: Response) => Promise<Response<any, Record<string, any>>>;
    me: (req: Request & {
        user?: unknown;
    }, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map