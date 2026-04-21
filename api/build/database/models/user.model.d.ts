import { Model } from "sequelize-typescript";
import { CONTENT_LANGUAGES, USER_ROLES } from "../../common/constants/app-constants";
import { ArticleComment } from "./article-comment.model";
import { ArticleLike } from "./article-like.model";
import { CartItem } from "./cart-item.model";
import { WishlistItem } from "./wishlist-item.model";
export declare class User extends Model {
    id: string;
    lang: CONTENT_LANGUAGES;
    firstname: string;
    lastname: string;
    email: string;
    password_hash: string | null;
    google_sub: string | null;
    facebook_id: string | null;
    role: USER_ROLES;
    phone: string | null;
    location: string | null;
    avatar_url: string | null;
    last_sign_in_at: Date | null;
    last_sign_in_method: string | null;
    last_sign_in_client: string | null;
    last_sign_in_device_label: string | null;
    last_sign_in_user_agent: string | null;
    last_sign_in_ip: string | null;
    sign_in_count: number;
    cart_items: CartItem[];
    wishlist_items: WishlistItem[];
    article_comments: ArticleComment[];
    article_likes: ArticleLike[];
    static assignId(instance: User): Promise<void>;
}
//# sourceMappingURL=user.model.d.ts.map