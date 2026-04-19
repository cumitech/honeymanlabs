import { z } from "zod";
import { USER_ROLES } from "../../common/constants/app-constants";
/** Auth register body — aligns with `User` (`firstname`, `lastname`, …) */
export declare const registerSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<typeof USER_ROLES>>;
    location: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Auth login body */
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const refreshSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export declare const updateMeSchema: z.ZodObject<{
    firstname: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    phone: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
}, z.core.$strip>;
export type UpdateMeInput = z.infer<typeof updateMeSchema>;
//# sourceMappingURL=auth.schema.d.ts.map