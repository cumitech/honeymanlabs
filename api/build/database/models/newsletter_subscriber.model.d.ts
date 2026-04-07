import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
export declare class NewsletterSubscriber extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    email: string;
    subscribed_at: Date;
    static assignId(instance: NewsletterSubscriber): Promise<void>;
}
//# sourceMappingURL=newsletter_subscriber.model.d.ts.map