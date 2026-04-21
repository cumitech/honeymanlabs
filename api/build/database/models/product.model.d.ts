import { Model } from "sequelize-typescript";
import { type ApparelSizeValue, type MeasurementTypeValue, type MeasurementUnitValue } from "../../common/constants/product-types";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { CartItem } from "./cart-item.model";
import { ProductCategory } from "./product-category.model";
import { ProductImage } from "./product_image.model";
import { ProductSubCategory } from "./product-sub-category.model";
import { WishlistItem } from "./wishlist-item.model";
export declare class Product extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    name: string;
    slug: string;
    description: string;
    price: number;
    category_id: string;
    category: ProductCategory;
    sub_category_id: string | null;
    sub_category: ProductSubCategory | null;
    stock_quantity: number;
    origin_region: string;
    featured_image: string;
    measurement_type: MeasurementTypeValue;
    measurement_unit: MeasurementUnitValue;
    /** Package size in the selected measurement unit (e.g., 500 + GRAM, 1 + LITER). */
    measurement_value: string;
    net_grams: string | null;
    net_milliliters: string | null;
    attributes: Record<string, unknown> | null;
    apparel_size: ApparelSizeValue | null;
    images: ProductImage[];
    cart_items: CartItem[];
    wishlist_items: WishlistItem[];
    static assignId(instance: Product): Promise<void>;
}
//# sourceMappingURL=product.model.d.ts.map