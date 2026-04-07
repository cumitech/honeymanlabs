import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { CONTENT_LANGUAGES, USER_ROLES } from "../../common/constants/app-contants";
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
  lang!: CONTENT_LANGUAGES;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  firstname!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lastname!: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password_hash!: string;

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
  role!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar_url!: string;

  @BeforeCreate
  static async assignId(instance: User) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}
