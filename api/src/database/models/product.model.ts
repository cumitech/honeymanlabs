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
import { DEFAULT_PRODUCT_TYPE } from "../../common/constants/product-types";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { ArticleCategory } from "./article_category.model";
import { ProductImage } from "./product_image.model";

@Table({
  tableName: "products",
  timestamps: true,
  underscored: true
})
export class Product extends Model {
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
    type: DataType.STRING(150),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false, unique: true
  })
  slug!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  price!: number;

  // relationships
  @ForeignKey(() => ArticleCategory)
  @Column({
    type: DataType.STRING(32),
    allowNull: false
  })
  category!: string;

  @BelongsTo(() => ArticleCategory)
  categoryModel!: ArticleCategory;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "stock_quantity"
  })
  stock_quantity!: number;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
    field: "origin_region"
  })
  origin_region!: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: "featured_image"
  })
  featured_image!: string;

  /** HONEY | HONEY_PRODUCTS | FARM_PRODUCTS | LAB_SUPPLIES | OTHER */
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: DEFAULT_PRODUCT_TYPE,
    field: "product_type",
  })
  product_type!: string;

  /** Net contents — jars, packs (grams). */
  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: true,
    field: "weight_grams",
  })
  weight_grams!: string | null;

  /** Liquid honey volume (liters). */
  @Column({
    type: DataType.DECIMAL(12, 4),
    allowNull: true,
    field: "liters",
  })
  liters!: string | null;

  /** For FARM_PRODUCTS apparel / wearables: S–XXL. */
  @Column({
    type: DataType.STRING(8),
    allowNull: true,
    field: "apparel_size",
  })
  apparel_size!: string | null;

  @HasMany(() => ProductImage)
  images!: ProductImage[];

  @BeforeCreate
  static async assignId(instance: Product) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

