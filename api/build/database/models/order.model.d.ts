import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { User } from "./user.model";
import { OrderItem } from "./order-item.model";
export declare class Order extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    user_id: string;
    user: User;
    order_items: OrderItem[];
    status: string;
    total_price: number;
    payment_status: string;
    static assignId(instance: Order): Promise<void>;
}
//# sourceMappingURL=order.model.d.ts.map