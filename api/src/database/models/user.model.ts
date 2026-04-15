import {
  Table,
  Column,
  Model,
  DataType,
  BeforeValidate,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES, USER_ROLES } from "../../common/constants/app-constants";
import { generateCustomIdForModel } from "../../common/utils/custom-id";

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
    allowNull: false,
  })
  declare password_hash: string;

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
    allowNull: false,
  })
  declare phone: string;

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

  @BeforeValidate
  static async assignId(instance: User) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
