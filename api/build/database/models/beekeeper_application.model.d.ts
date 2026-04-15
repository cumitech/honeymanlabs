import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
export declare class BeekeeperApplication extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    name: string;
    region: string;
    phone: string;
    experience: number;
    number_of_hives: number;
    status: string;
    submitted_at: Date;
    static assignId(instance: BeekeeperApplication): Promise<void>;
}
//# sourceMappingURL=beekeeper_application.model.d.ts.map