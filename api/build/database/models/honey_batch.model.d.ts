import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
import { Beekeeper } from "./beekeeper.model";
import { Apiary } from "./apiary.model";
export declare class HoneyBatch extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    batch_code: string;
    beekeeper_id: string;
    beekeeper: Beekeeper;
    apiary_id: string;
    apiary: Apiary;
    region: string;
    harvest_date: string;
    floral_source: string;
    moisture_content: number;
    certification_status: string;
    lab_tests: any[];
    static assignId(instance: HoneyBatch): Promise<void>;
}
//# sourceMappingURL=honey_batch.model.d.ts.map