import { z } from "zod";
import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
export declare const createArticleSchema: z.ZodObject<{
    lang: z.ZodOptional<z.ZodEnum<typeof CONTENT_LANGUAGES>>;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        draft: "draft";
        published: "published";
        archived: "archived";
    }>>;
    cover_image: z.ZodOptional<z.ZodString>;
    category_id: z.ZodString;
    published_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateArticleSchema: z.ZodObject<{
    lang: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof CONTENT_LANGUAGES>>>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        draft: "draft";
        published: "published";
        archived: "archived";
    }>>>;
    cover_image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category_id: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const createArticleCommentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=articles.schema.d.ts.map