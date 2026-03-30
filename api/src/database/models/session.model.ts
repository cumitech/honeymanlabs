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

@Table({
  tableName: "sessions",
  timestamps: true,
  underscored: true
})
export class Session extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(32), allowNull: false, field: "user_id" })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column({ type: DataType.STRING(512), allowNull: false, field: "refresh_token" })
  refresh_token!: string;

  @Column({ type: DataType.DATE, allowNull: false, field: "expires_at" })
  expires_at!: Date;

  @BeforeCreate
  static async assignId(instance: Session) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

