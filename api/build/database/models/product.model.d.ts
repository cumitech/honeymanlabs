import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { ArticleCategory } from "./article_category.model";
import { ProductImage } from "./product_image.model";
export declare class Product extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    categoryModel: ArticleCategory;
    stock_quantity: number;
    origin_region: string;
    featured_image: string;
    /** HONEY | HONEY_PRODUCTS | FARM_PRODUCTS | LAB_SUPPLIES | OTHER */
    product_type: string;
    /** Net contents — jars, packs (grams). */
    weight_grams: string | null;
    /** Liquid honey volume (liters). */
    liters: string | null;
    /** For FARM_PRODUCTS apparel / wearables: S–XXL. */
    apparel_size: string | null;
    images: ProductImage[];
    static assignId(instance: Product): Promise<void>;
}
//# sourceMappingURL=product.model.d.ts.map