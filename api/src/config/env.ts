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
  JWT_REFRESH_SECRET: z.string().min(1),

  // Auth0 configuration (kept in sync with frontend env for auth integrations)
  AUTH0_ISSUER_BASE_URL: z.string().url().optional(),
  AUTH0_CLIENT_ID: z.string().optional(),
  AUTH0_CLIENT_SECRET: z.string().optional(),
  AUTH0_SCOPE: z.string().optional(),
  AUTH0_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  AUTH0_BASE_URL: z.string().url().optional(),
  APP_BASE_URL: z.string().url().optional(),
  CALLBACK_URL: z.string().url().optional(),
  LOGOUT_URL: z.string().url().optional(),

  //sync database models on startup
  DB_SYNC: z.coerce.boolean().optional().default(false),

  //require database authentication to start the server
  REQUIRE_DB: z.coerce.boolean().optional().default(false),
});

export const env = EnvSchema.parse(process.env);

