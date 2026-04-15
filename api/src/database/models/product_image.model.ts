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
import { Product } from "./product.model";

@Table({
  tableName: "product_images",
  timestamps: true,
  underscored: true
})
export class ProductImage extends Model {
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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "product_id"
  })
  product_id!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: "image_url"
  })
  image_url!: string;

  @BeforeCreate
  static async assignId(instance: ProductImage) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

