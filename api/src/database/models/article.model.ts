import {
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";
import { ArticleCategory } from "./article_category.model";
import { User } from "./user.model";

@Table({
  tableName: "articles",
  timestamps: true,
  underscored: true,
})
export class Article extends Model {
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
    type: DataType.STRING(150),
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING(180),
    allowNull: false,
    unique: true,
  })
  declare slug: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  declare excerpt: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    defaultValue: "draft",
  })
  declare status: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: "cover_image",
  })
  declare cover_image: string | null;

  @ForeignKey(() => ArticleCategory)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "category_id",
  })
  declare category_id: string;

  @BelongsTo(() => ArticleCategory)
  declare category: ArticleCategory;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    field: "author_id",
  })
  declare author_id: string;

  @BelongsTo(() => User)
  declare author: User;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "published_at",
  })
  declare published_at: Date | null;

  @BeforeValidate
  static async assignId(instance: Article) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
