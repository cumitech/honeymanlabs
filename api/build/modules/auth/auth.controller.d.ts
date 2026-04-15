import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import { type AuthTokenPayload } from "../../common/utils/jwt";
import { AuthService } from "./auth.service";
import { forgotPasswordSchema, loginSchema, registerSchema } from "./auth.schema";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register: (req: TypedRequestBody<typeof registerSchema>, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: TypedRequestBody<typeof loginSchema>, res: Response) => Promise<Response<any, Record<string, any>>>;
    forgotPassword: (req: TypedRequestBody<typeof forgotPasswordSchema>, res: Response) => Promise<Response<any, Record<string, any>>>;
    me: (req: Request & {
        user?: AuthTokenPayload;
    }, res: Response) => Promise<Response<any, Record<string, any>>>;
    adminCapabilities: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    contentWriteCapabilities: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map