import { z } from "zod";
import { USER_ROLES } from "../../common/constants/app-constants";
import { emailField, optionalUrlString, passwordField, requiredString } from "../../common/validation";

const clientKindField = z.enum(["web", "ios", "android"]).optional();
const deviceLabelField = z.string().trim().max(255).optional();

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
  clientKind: clientKindField,
  deviceLabel: deviceLabelField,
});

/** Auth login body */
export const loginSchema = z.object({
  email: emailField(),
  password: z.string().min(1, "Password is required"),
  clientKind: clientKindField,
  deviceLabel: deviceLabelField,
});

export const forgotPasswordSchema = z.object({
  email: emailField(),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const socialGoogleSchema = z.object({
  idToken: z.string().min(20, "Invalid Google token"),
  clientKind: clientKindField,
  deviceLabel: deviceLabelField,
});

export const socialFacebookSchema = z.object({
  accessToken: z.string().min(10, "Invalid Facebook token"),
  clientKind: clientKindField,
  deviceLabel: deviceLabelField,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type SocialGoogleInput = z.infer<typeof socialGoogleSchema>;
export type SocialFacebookInput = z.infer<typeof socialFacebookSchema>;

export const updateMeSchema = z
  .object({
    firstname: z.string().trim().min(1).max(50).optional(),
    lastname: z.string().trim().min(1).max(50).optional(),
    avatar_url: z.union([z.string().url(), z.null()]).optional(),
    phone: z.string().trim().min(3).max(40).optional(),
    location: z.union([z.string().trim().max(200), z.null()]).optional(),
  })
  .refine((body) => Object.values(body).some((v) => v !== undefined), {
    message: "At least one field is required",
  });

export type UpdateMeInput = z.infer<typeof updateMeSchema>;
