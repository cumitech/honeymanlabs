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
import {
  APPAREL_SIZES,
  MEASUREMENT_TYPES,
  MEASUREMENT_UNITS,
  type ApparelSizeValue,
  type MeasurementTypeValue,
  type MeasurementUnitValue,
} from "../../common/constants/product-types";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { CartItem } from "./cart-item.model";
import { ProductCategory } from "./product-category.model";
import { ProductImage } from "./product_image.model";
import { ProductSubCategory } from "./product-sub-category.model";
import { WishlistItem } from "./wishlist-item.model";

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

  @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "category_id",
  })
  category_id!: string;

  @BelongsTo(() => ProductCategory)
  category!: ProductCategory;

  @ForeignKey(() => ProductSubCategory)
  @Column({
    type: DataType.STRING(32),
    allowNull: true,
    field: "sub_category_id",
  })
  sub_category_id!: string | null;

  @BelongsTo(() => ProductSubCategory)
  sub_category!: ProductSubCategory | null;

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

  @Column({
    type: DataType.ENUM(...MEASUREMENT_TYPES),
    allowNull: false,
    defaultValue: "MASS",
    field: "measurement_type",
  })
  measurement_type!: MeasurementTypeValue;

  @Column({
    type: DataType.ENUM(...MEASUREMENT_UNITS),
    allowNull: false,
    defaultValue: "GRAM",
    field: "measurement_unit",
  })
  measurement_unit!: MeasurementUnitValue;

  /** Package size in the selected measurement unit (e.g., 500 + GRAM, 1 + LITER). */
  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0,
    field: "measurement_value",
  })
  measurement_value!: string;

  @Column({
    type: DataType.DECIMAL(12, 3),
    allowNull: true,
    field: "net_grams",
  })
  net_grams!: string | null;

  @Column({
    type: DataType.DECIMAL(12, 3),
    allowNull: true,
    field: "net_milliliters",
  })
  net_milliliters!: string | null;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "attributes",
  })
  attributes!: Record<string, unknown> | null;

  @Column({
    type: DataType.ENUM(...APPAREL_SIZES),
    allowNull: true,
    field: "apparel_size",
  })
  apparel_size!: ApparelSizeValue | null;

  @HasMany(() => ProductImage)
  images!: ProductImage[];

  @HasMany(() => CartItem)
  cart_items!: CartItem[];

  @HasMany(() => WishlistItem)
  wishlist_items!: WishlistItem[];

  @BeforeCreate
  static async assignId(instance: Product) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

