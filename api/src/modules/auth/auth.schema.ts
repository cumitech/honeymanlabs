import { z } from "zod";
import { USER_ROLES } from "../../common/constants/app-constants";
import { emailField, optionalUrlString, passwordField, requiredString } from "../../common/validation";

/** Auth register body — aligns with `User` (`firstname`, `lastname`, …) */
export const registerSchema = z.object({
  firstname: requiredString("First name"),
  lastname: requiredString("Last name"),
  email: emailField(),
  password: passwordField(8),
  phone: requiredString("Phone"),
  role: z.nativeEnum(USER_ROLES).optional(),
  location: z.string().optional(),
  avatar_url: optionalUrlString().optional(),
});

/** Auth login body */
export const loginSchema = z.object({
  email: emailField(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailField(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
