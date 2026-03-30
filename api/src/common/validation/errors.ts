import type { Response } from "express";
import type { ZodError } from "zod";

export type ValidationIssue = {
  path: string;
  message: string;
};

/** Flatten Zod issues for JSON responses */
export function formatZodIssues(error: ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    path: issue.path.length ? issue.path.map(String).join(".") : "(root)",
    message: issue.message,
  }));
}

/** Standard 400 response for failed body validation */
export function sendValidationError(res: Response, error: ZodError) {
  return res.status(400).json({
    message: "Validation failed",
    errors: formatZodIssues(error),
  });
}
