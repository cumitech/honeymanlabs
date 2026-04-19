import { PERMISSIONS, USER_ROLES } from "../constants/app-constants";
export type AuthTokenPayload = {
    userId: string;
    role: USER_ROLES;
    permissions: PERMISSIONS[];
};
export type RefreshTokenPayload = {
    userId: string;
};
export declare const signAccessToken: (payload: AuthTokenPayload) => string;
export declare const signRefreshToken: (payload: RefreshTokenPayload) => string;
export declare const verifyAccessToken: (token: string) => AuthTokenPayload;
export declare const verifyRefreshToken: (token: string) => RefreshTokenPayload;
//# sourceMappingURL=jwt.d.ts.map