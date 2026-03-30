import { z } from "zod";

/** Reusable email field for request bodies */
export const emailField = () =>
  z.string().min(1, "Email is required").email("Invalid email address");

/** Reusable password field (minimum length) */
export const passwordField = (min = 8) =>
  z.string().min(min, `Password must be at least ${min} characters`);

/** Non-empty trimmed string */
export const requiredString = (fieldLabel: string) =>
  z.string().trim().min(1, `${fieldLabel} is required`);

/** Optional absolute URL (omit undefined; use in .optional() chains) */
export const optionalUrlString = () => z.string().url("Invalid URL");
