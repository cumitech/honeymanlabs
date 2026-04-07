import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
export declare class Event extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    title: string;
    description: string;
    location: string;
    event_date: string;
    capacity: number;
    static assignId(instance: Event): Promise<void>;
}
//# sourceMappingURL=event.model.d.ts.map