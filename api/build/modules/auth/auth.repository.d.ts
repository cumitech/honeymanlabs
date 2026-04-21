import { User } from "../../database/models/user.model";
import { USER_ROLES } from "../../common/constants/app-constants";
/**
 * Registration payload — field names match `User` model columns.
 * `password` is plaintext here; persist as `password_hash` via `CreateUserData`.
 */
export type RegisterData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    /** Optional on signup; defaults to `USER_ROLES.CUSTOMER` on the model if omitted */
    role?: USER_ROLES | undefined;
    location?: string | undefined;
    avatar_url?: string | undefined;
};
export type CreateUserData = Omit<RegisterData, "password"> & {
    password_hash: string;
};
export type CreateOAuthUserData = {
    firstname: string;
    lastname: string;
    email: string;
    password_hash: null;
    phone: string | null;
    avatar_url: string | null;
    google_sub: string | null;
    facebook_id: string | null;
};
export declare class AuthRepository {
    findByEmail(email: string): Promise<User | null>;
    findByGoogleSub(googleSub: string): Promise<User | null>;
    findByFacebookId(facebookId: string): Promise<User | null>;
    createUser(data: CreateUserData): Promise<User>;
    createOAuthUser(data: CreateOAuthUserData): Promise<User>;
    findById(id: string): Promise<User | null>;
    updateUser(id: string, fields: Partial<Pick<User, "firstname" | "lastname" | "avatar_url" | "phone" | "location" | "google_sub" | "facebook_id">>): Promise<User | null>;
    recordSignIn(userId: string, row: {
        method: string;
        clientKind: string | null;
        deviceLabel: string | null;
        userAgent: string | null;
        ipAddress: string | null;
    }): Promise<void>;
}
//# sourceMappingURL=auth.repository.d.ts.map