import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { Article } from "./article.model";
import { User } from "./user.model";

@Table({
  tableName: "article_likes",
  timestamps: true,
  underscored: true,
})
export class ArticleLike extends Model {
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

  @Unique("uq_article_like_user_article")
  @ForeignKey(() => Article)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "article_id",
  })
  article_id!: string;

  @BelongsTo(() => Article)
  article!: Article;

  @Unique("uq_article_like_user_article")
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "user_id",
  })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @BeforeCreate
  static async assignId(instance: ArticleLike) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

