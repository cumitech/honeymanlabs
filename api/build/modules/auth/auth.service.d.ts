import { type AuthTokenPayload } from "../../common/utils/jwt";
import { AuthRepository, type RegisterData } from "./auth.repository";
export type LoginData = {
    email: string;
    password: string;
};
export declare class AuthService {
    private readonly repo;
    constructor(repo: AuthRepository);
    register(data: RegisterData): Promise<{
        token: string;
    }>;
    login(data: LoginData): Promise<{
        token: string;
    }>;
    getProfile(auth: AuthTokenPayload): Promise<{
        userId: string;
        firstname: string;
        lastname: string;
        email: string;
        avatar_url: string | null;
        role: import("../../common/constants/app-contants").USER_ROLES;
        permissions: import("../../common/constants/app-contants").PERMISSIONS[];
    }>;
    forgotPassword(email: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map