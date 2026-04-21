import {
  Table,
  Column,
  Model,
  DataType,
  BeforeValidate,
  HasMany,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES, USER_ROLES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { ArticleComment } from "./article-comment.model";
import { ArticleLike } from "./article-like.model";
import { CartItem } from "./cart-item.model";
import { WishlistItem } from "./wishlist-item.model";

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true
})
export class User extends Model {
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
  declare lang: CONTENT_LANGUAGES;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare firstname: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare lastname: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password_hash: string | null;

  @Column({
    type: DataType.STRING(128),
    allowNull: true,
    unique: true,
  })
  declare google_sub: string | null;

  @Column({
    type: DataType.STRING(64),
    allowNull: true,
    unique: true,
  })
  declare facebook_id: string | null;

  @Column({
    type: DataType.ENUM(
      USER_ROLES.ADMIN,
      USER_ROLES.CUSTOMER,
      USER_ROLES.BEEKEEPER,
      USER_ROLES.LAB_STAFF,
    ),
    defaultValue: USER_ROLES.CUSTOMER,
    allowNull: false,
  })
  declare role: USER_ROLES;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare location: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatar_url: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare last_sign_in_at: Date | null;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
  })
  declare last_sign_in_method: string | null;

  @Column({
    type: DataType.STRING(16),
    allowNull: true,
  })
  declare last_sign_in_client: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare last_sign_in_device_label: string | null;

  @Column({
    type: DataType.STRING(512),
    allowNull: true,
  })
  declare last_sign_in_user_agent: string | null;

  @Column({
    type: DataType.STRING(64),
    allowNull: true,
  })
  declare last_sign_in_ip: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare sign_in_count: number;

  @HasMany(() => CartItem)
  cart_items!: CartItem[];

  @HasMany(() => WishlistItem)
  wishlist_items!: WishlistItem[];

  @HasMany(() => ArticleComment)
  article_comments!: ArticleComment[];

  @HasMany(() => ArticleLike)
  article_likes!: ArticleLike[];

  @BeforeValidate
  static async assignId(instance: User) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
