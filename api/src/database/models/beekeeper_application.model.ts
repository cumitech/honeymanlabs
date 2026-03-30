import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { generateCustomIdForModel } from "../../common/utils/custom-id";

@Table({
  tableName: "beekeeper_applications",
  timestamps: true,
  underscored: true
})
export class BeekeeperApplication extends Model {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false
  })
  region!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  phone!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  experience!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "number_of_hives"
  })
  number_of_hives!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "submitted_at"
  })
  submitted_at!: Date;

  @BeforeCreate
  static async assignId(instance: BeekeeperApplication) {
    if (instance.id) return;
    instance.id = await generateCustomIdForModel(this);
  }
}

