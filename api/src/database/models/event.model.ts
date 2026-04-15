import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";

@Table({
  tableName: "events",
  timestamps: true,
  underscored: true
})
export class Event extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  location!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: "event_date"
  })
  event_date!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  capacity!: number;

  @BeforeCreate
  static async assignId(instance: Event) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

