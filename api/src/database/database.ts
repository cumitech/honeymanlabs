import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import {
  Apiary,
  ArticleCategory,
  Beekeeper,
  BeekeeperApplication,
  Event,
  HoneyBatch,
  LabResult,
  LabTest,
  NewsletterSubscriber,
  Order,
  Product,
  ProductImage,
  Session,
  User,
} from "./models";

dotenv.config();

const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

export const sequelize = new Sequelize({
  database: `${process.env.DB_NAME}`,
  dialect: "mysql",
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  host: `${process.env.DB_HOST}`,
  ...(typeof dbPort === "number" ? { port: dbPort } : {}),
  dialectOptions: {
    connectTimeout: 3000,
  },
  models: [
    User,
    Event,
    ArticleCategory,
    NewsletterSubscriber,
    BeekeeperApplication,
    Beekeeper,
    Apiary,
    HoneyBatch,
    LabTest,
    LabResult,
    Order,
    Product,
    ProductImage,
    Session,
  ],
});

export default sequelize;