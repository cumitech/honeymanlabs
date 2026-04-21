import { USER_ROLES } from "../../common/constants/app-constants";
import { type AuthTokenPayload } from "../../common/utils/jwt";
import type { RegisterInput, UpdateMeInput } from "./auth.schema";
import { AuthRepository } from "./auth.repository";
import type { SignInAuditFields } from "./sign-in-audit";
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};
export type LoginData = {
    email: string;
    password: string;
};
export declare class AuthService {
    private readonly repo;
    constructor(repo: AuthRepository);
    private issueTokens;
    private finalizeAuth;
    register(data: RegisterInput, audit: SignInAuditFields): Promise<AuthTokens>;
    login(data: LoginData, audit: SignInAuditFields): Promise<AuthTokens>;
    private googleAudiences;
    loginWithGoogleIdToken(idToken: string, audit: SignInAuditFields): Promise<AuthTokens>;
    loginWithFacebookAccessToken(accessToken: string, audit: SignInAuditFields): Promise<AuthTokens>;
    refresh(refreshToken: string): Promise<AuthTokens>;
    getProfile(auth: AuthTokenPayload): Promise<{
        userId: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string | null;
        location: string | null;
        avatar_url: string | null;
        role: USER_ROLES;
        permissions: import("../../common/constants/app-constants").PERMISSIONS[];
    }>;
    updateMyProfile(auth: AuthTokenPayload, data: UpdateMeInput): Promise<{
        userId: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string | null;
        location: string | null;
        avatar_url: string | null;
        role: USER_ROLES;
        permissions: import("../../common/constants/app-constants").PERMISSIONS[];
    }>;
    forgotPassword(email: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map