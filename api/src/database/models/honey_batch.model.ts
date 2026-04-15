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
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { Beekeeper } from "./beekeeper.model";
import { Apiary } from "./apiary.model";
import { LabTest } from "./lab_test.model";

@Table({
  tableName: "honey_batches",
  timestamps: true,
  underscored: true,
})
export class HoneyBatch extends Model {
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
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    field: "batch_code",
  })
  batch_code!: string;

  @ForeignKey(() => Beekeeper)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "beekeeper_id",
  })
  beekeeper_id!: string;

  @BelongsTo(() => Beekeeper)
  beekeeper!: Beekeeper;

  @ForeignKey(() => Apiary)
  @Column({ type: DataType.STRING(32), allowNull: false, field: "apiary_id" })
  apiary_id!: string;

  @BelongsTo(() => Apiary)
  apiary!: Apiary;

  @Column({ type: DataType.STRING(50), allowNull: false })
  region!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false, field: "harvest_date" })
  harvest_date!: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
    field: "floral_source",
  })
  floral_source!: string;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    field: "moisture_content",
  })
  moisture_content!: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    field: "certification_status",
  })
  certification_status!: string;

  @HasMany(() => LabTest)
  lab_tests!: any[];

  @BeforeCreate
  static async assignId(instance: HoneyBatch) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
