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

@Table({
  tableName: "apiaries",
  timestamps: true,
  underscored: true
})
export class Apiary extends Model {
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

  @ForeignKey(() => Beekeeper)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "beekeeper_id"
  })
  beekeeper_id!: string;

  @BelongsTo(() => Beekeeper)
  beekeeper!: Beekeeper;

  @Column({
    type: DataType.STRING(120),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL(10, 6),
    allowNull: false
  })
  latitude!: number;

  @Column({
    type: DataType.DECIMAL(10, 6),
    allowNull: false
  })
  longitude!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  region!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "number_of_hives"
  })
  number_of_hives!: number;

  // Lazy require to avoid TS/IDE resolution quirks.
  @HasMany(() => require("./honey_batch.model").HoneyBatch)
  honey_batches!: any[];

  @BeforeCreate
  static async assignId(instance: Apiary) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

