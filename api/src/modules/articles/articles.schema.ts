import { z } from "zod";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";

export const createArticleSchema = z.object({
  lang: z.nativeEnum(CONTENT_LANGUAGES).optional(),
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(20),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  cover_image: z.string().url().optional(),
  category_id: z.string().min(1),
  published_at: z.string().datetime().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export const createArticleCommentSchema = z.object({
  content: z.string().min(2).max(4000),
});
