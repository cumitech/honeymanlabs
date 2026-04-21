import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { Order } from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: true,
  underscored: true,
})
export class OrderItem extends Model {
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

  @ForeignKey(() => Order)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "order_id",
  })
  order_id!: string;

  @BelongsTo(() => Order)
  order!: Order;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "catalog_product_id",
  })
  catalog_product_id!: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "category_id",
  })
  category_id!: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
    field: "sub_category_id",
  })
  sub_category_id!: string | null;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
    field: "measurement_type",
  })
  measurement_type!: string | null;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
    field: "measurement_unit",
  })
  measurement_unit!: string | null;

  @Column({
    type: DataType.DECIMAL(12, 3),
    allowNull: true,
    field: "measurement_value",
  })
  measurement_value!: string | null;

  @Column({
    type: DataType.STRING(8),
    allowNull: true,
    field: "apparel_size",
  })
  apparel_size!: string | null;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: "product_name",
  })
  product_name!: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    field: "unit_price",
  })
  unit_price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    field: "line_total",
  })
  line_total!: number;

  @BeforeCreate
  static async assignId(instance: OrderItem) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
