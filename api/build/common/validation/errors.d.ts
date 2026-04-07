import type { Response } from "express";
import type { ZodError } from "zod";
export type ValidationIssue = {
    path: string;
    message: string;
};
/** Flatten Zod issues for JSON responses */
export declare function formatZodIssues(error: ZodError): ValidationIssue[];
/** Standard 400 response for failed body validation */
export declare function sendValidationError(res: Response, error: ZodError): Response<any, Record<string, any>>;
//# sourceMappingURL=errors.d.ts.map