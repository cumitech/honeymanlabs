import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().default(5000),

  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().optional().default(""),

  JWT_SECRET: z.string().min(1),

  //sync database models on startup
  DB_SYNC: z.coerce.boolean().optional().default(false),

  //require database authentication to start the server
  REQUIRE_DB: z.coerce.boolean().optional().default(false),
});

export const env = EnvSchema.parse(process.env);

