import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { ArticleComment } from "./article-comment.model";
import { ArticleCategory } from "./article_category.model";
import { ArticleLike } from "./article-like.model";
import { User } from "./user.model";
export declare class Article extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: string;
    cover_image: string | null;
    category_id: string;
    category: ArticleCategory;
    author_id: string;
    author: User;
    comments: ArticleComment[];
    likes: ArticleLike[];
    published_at: Date | null;
    static assignId(instance: Article): Promise<void>;
}
//# sourceMappingURL=article.model.d.ts.map