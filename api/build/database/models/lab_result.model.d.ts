import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { LabTest } from "./lab_test.model";
export declare class LabResult extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    lab_test_id: string;
    lab_test: LabTest;
    parameter: string;
    value: number;
    unit: string;
    static assignId(instance: LabResult): Promise<void>;
}
//# sourceMappingURL=lab_result.model.d.ts.map