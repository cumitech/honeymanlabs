import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import {
  Apiary,
  Article,
  ArticleCategory,
  ArticleComment,
  ArticleLike,
  Beekeeper,
  BeekeeperApplication,
  CartItem,
  Event,
  HoneyBatch,
  LabResult,
  LabTest,
  NewsletterSubscriber,
  Order,
  OrderItem,
  Product,
  ProductCategory,
  ProductImage,
  ProductSubCategory,
  Session,
  User,
  WishlistItem,
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
    Article,
    ArticleCategory,
    ArticleComment,
    ArticleLike,
    NewsletterSubscriber,
    BeekeeperApplication,
    Beekeeper,
    Apiary,
    HoneyBatch,
    LabTest,
    LabResult,
    Order,
    OrderItem,
    Product,
    ProductCategory,
    ProductImage,
    ProductSubCategory,
    Session,
    CartItem,
    WishlistItem,
  ],
});

export default sequelize;