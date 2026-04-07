import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
import { User } from "./user.model";
export declare class Order extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    user_id: string;
    user: User;
    status: string;
    total_price: number;
    payment_status: string;
    static assignId(instance: Order): Promise<void>;
}
//# sourceMappingURL=order.model.d.ts.map