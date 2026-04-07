import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
export declare class User extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    firstname: string;
    lastname: string;
    email: string;
    password_hash: string;
    role: string;
    phone: string;
    location: string;
    avatar_url: string;
    static assignId(instance: User): Promise<void>;
}
//# sourceMappingURL=user.model.d.ts.map