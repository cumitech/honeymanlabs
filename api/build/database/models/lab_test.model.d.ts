import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { HoneyBatch } from "./honey_batch.model";
import { User } from "./user.model";
import { LabResult } from "./lab_result.model";
export declare class LabTest extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    sample_code: string;
    batch_id: string;
    batch: HoneyBatch;
    requested_by: string;
    requestedBy: User;
    test_type: string;
    status: string;
    submitted_at: Date;
    completed_at: Date | null;
    report_url: string | null;
    lab_results: LabResult[];
    static assignId(instance: LabTest): Promise<void>;
}
//# sourceMappingURL=lab_test.model.d.ts.map