import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { HoneyBatch } from "./honey_batch.model";
import { User } from "./user.model";
import { LabResult } from "./lab_result.model";

@Table({
  tableName: "lab_tests",
  timestamps: true,
  underscored: true
})
export class LabTest extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(CONTENT_LANGUAGES.EN, CONTENT_LANGUAGES.FR),
    allowNull: false,
    defaultValue: CONTENT_LANGUAGES.EN,
  })
  lang!: CONTENT_LANGUAGES;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "sample_code"
  })
  sample_code!: string;

  @ForeignKey(() => HoneyBatch)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "batch_id"
  })
  batch_id!: string;

  @BelongsTo(() => HoneyBatch)
  batch!: HoneyBatch;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "requested_by"
  })
  requested_by!: string;

  @BelongsTo(() => User)
  requestedBy!: User;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    field: "test_type"
  })
  test_type!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "submitted_at"
  })
  submitted_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "completed_at"
  })
  completed_at!: Date | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "report_url"
  })
  report_url!: string | null;

  @HasMany(() => LabResult)
  lab_results!: LabResult[];

  @BeforeCreate
  static async assignId(instance: LabTest) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

