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
import { User } from "./user.model";
import { OrderItem } from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: true,
  underscored: true
})
export class Order extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "user_id"
  })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => OrderItem)
  order_items!: OrderItem[];

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    field: "total_price",
  })
  total_price!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: "payment_status",
  })
  payment_status!: string;

  @BeforeCreate
  static async assignId(instance: Order) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

