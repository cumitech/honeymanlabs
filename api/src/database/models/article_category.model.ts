import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { generateCustomIdForModel } from "../../common/utils/custom-id";

@Table({
  tableName: "article_categories",
  timestamps: true,
  underscored: true
})
export class ArticleCategory extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false, unique: true
  })
  name!: string;

  @BeforeCreate
  static async assignId(instance: ArticleCategory) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

