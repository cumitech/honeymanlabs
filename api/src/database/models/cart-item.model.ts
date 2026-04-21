import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({
  tableName: "cart_items",
  timestamps: true,
  underscored: true,
})
export class CartItem extends Model {
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

  @Unique("uq_cart_user_product")
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "user_id",
  })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @Unique("uq_cart_user_product")
  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "product_id",
  })
  product_id!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  quantity!: number;

  @BeforeCreate
  static async assignId(instance: CartItem) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

