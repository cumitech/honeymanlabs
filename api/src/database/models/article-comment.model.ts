import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { Article } from "./article.model";
import { User } from "./user.model";

@Table({
  tableName: "article_comments",
  timestamps: true,
  underscored: true,
})
export class ArticleComment extends Model {
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

  @ForeignKey(() => Article)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "article_id",
  })
  article_id!: string;

  @BelongsTo(() => Article)
  article!: Article;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "user_id",
  })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @BeforeCreate
  static async assignId(instance: ArticleComment) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

