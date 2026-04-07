import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-contants";
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
    images: ProductImage[];
    static assignId(instance: Product): Promise<void>;
}
//# sourceMappingURL=product.model.d.ts.map