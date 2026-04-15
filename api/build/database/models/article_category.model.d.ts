import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
export declare class ArticleCategory extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    name: string;
    static assignId(instance: ArticleCategory): Promise<void>;
}
//# sourceMappingURL=article_category.model.d.ts.map