import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES, USER_ROLES } from "../../common/constants/app-constants";
export declare class User extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    firstname: string;
    lastname: string;
    email: string;
    password_hash: string;
    role: USER_ROLES;
    phone: string;
    location: string | null;
    avatar_url: string | null;
    static assignId(instance: User): Promise<void>;
}
//# sourceMappingURL=user.model.d.ts.map