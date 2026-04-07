import { z } from "zod";
/** Auth register body — aligns with `User` (`firstname`, `lastname`, …) */
export declare const registerSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Auth login body */
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map