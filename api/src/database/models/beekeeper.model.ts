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
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { User } from "./user.model";
import { Apiary } from "./apiary.model";
import { HoneyBatch } from "./honey_batch.model";

@Table({
  tableName: "beekeepers",
  timestamps: true,
  underscored: true
})
export class Beekeeper extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "user_id"
  })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.STRING(120),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false
  })
  region!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: "farm_location"
  })
  farm_location!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "years_experience"
  })
  years_experience!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "certification_status"
  })
  certification_status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: "bio"
  })
  bio!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "created_at"
  })
  created_at!: Date;

  @HasMany(() => Apiary)
  apiaries!: Apiary[];

  @HasMany(() => HoneyBatch)
  honey_batches!: HoneyBatch[];

  @BeforeCreate
  static async assignId(instance: Beekeeper) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

