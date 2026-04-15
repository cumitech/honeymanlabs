import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { User } from "./user.model";
import { Apiary } from "./apiary.model";
import { HoneyBatch } from "./honey_batch.model";
export declare class Beekeeper extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    user_id: string;
    user: User;
    name: string;
    region: string;
    farm_location: string;
    years_experience: number;
    certification_status: string;
    bio: string | null;
    created_at: Date;
    apiaries: Apiary[];
    honey_batches: HoneyBatch[];
    static assignId(instance: Beekeeper): Promise<void>;
}
//# sourceMappingURL=beekeeper.model.d.ts.map