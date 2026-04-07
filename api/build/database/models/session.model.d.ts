import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
import { User } from "./user.model";
export declare class Session extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    user_id: string;
    user: User;
    refresh_token: string;
    expires_at: Date;
    static assignId(instance: Session): Promise<void>;
}
//# sourceMappingURL=session.model.d.ts.map