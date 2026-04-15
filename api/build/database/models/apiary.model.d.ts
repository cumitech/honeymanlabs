import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { Beekeeper } from "./beekeeper.model";
export declare class Apiary extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    beekeeper_id: string;
    beekeeper: Beekeeper;
    name: string;
    latitude: number;
    longitude: number;
    region: string;
    number_of_hives: number;
    honey_batches: any[];
    static assignId(instance: Apiary): Promise<void>;
}
//# sourceMappingURL=apiary.model.d.ts.map