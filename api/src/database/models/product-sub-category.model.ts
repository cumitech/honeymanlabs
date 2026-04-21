import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { ProductCategory } from "./product-category.model";
import { Product } from "./product.model";

@Table({
  tableName: "product_sub_categories",
  timestamps: true,
  underscored: true,
})
export class ProductSubCategory extends Model {
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

  @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "category_id",
  })
  category_id!: string;

  @BelongsTo(() => ProductCategory)
  category!: ProductCategory;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    unique: true,
  })
  code!: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: "sort_order",
  })
  sort_order!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: "is_active",
  })
  is_active!: boolean;

  @HasMany(() => Product)
  products!: Product[];

  @BeforeCreate
  static async assignId(instance: ProductSubCategory) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

