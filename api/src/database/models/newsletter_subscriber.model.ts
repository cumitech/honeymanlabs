import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { generateCustomIdForModel } from "../../common/utils/custom-id";

@Table({
  tableName: "newsletter_subscribers",
  timestamps: true,
  underscored: true
})
export class NewsletterSubscriber extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "subscribed_at",
  })
  subscribed_at!: Date;

  @BeforeCreate
  static async assignId(instance: NewsletterSubscriber) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

