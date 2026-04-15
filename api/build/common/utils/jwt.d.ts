import { PERMISSIONS, USER_ROLES } from "../constants/app-constants";
export type AuthTokenPayload = {
    userId: string;
    role: USER_ROLES;
    permissions: PERMISSIONS[];
};
export declare const signToken: (payload: AuthTokenPayload) => string;
export declare const verifyToken: (token: string) => AuthTokenPayload;
//# sourceMappingURL=jwt.d.ts.map