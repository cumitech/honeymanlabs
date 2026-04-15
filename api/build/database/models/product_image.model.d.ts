import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { Product } from "./product.model";
export declare class ProductImage extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    product_id: string;
    product: Product;
    image_url: string;
    static assignId(instance: ProductImage): Promise<void>;
}
//# sourceMappingURL=product_image.model.d.ts.map