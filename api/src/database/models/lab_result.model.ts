import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { LabTest } from "./lab_test.model";

@Table({
  tableName: "lab_results",
  timestamps: true,
  underscored: true
})
export class LabResult extends Model {
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

  @ForeignKey(() => LabTest)
  @Column({
    type: DataType.STRING(32),
    allowNull: false, field: "lab_test_id"
  })
  lab_test_id!: string;

  @BelongsTo(() => LabTest)
  lab_test!: LabTest;

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  parameter!: string;

  @Column({
    type: DataType.DECIMAL(12, 4),
    allowNull: false
  })
  value!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  unit!: string;

  @BeforeCreate
  static async assignId(instance: LabResult) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

