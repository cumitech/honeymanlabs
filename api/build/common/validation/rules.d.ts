import { z } from "zod";
/** Reusable email field for request bodies */
export declare const emailField: () => z.ZodString;
/** Reusable password field (minimum length) */
export declare const passwordField: (min?: number) => z.ZodString;
/** Non-empty trimmed string */
export declare const requiredString: (fieldLabel: string) => z.ZodString;
/** Optional absolute URL (omit undefined; use in .optional() chains) */
export declare const optionalUrlString: () => z.ZodString;
//# sourceMappingURL=rules.d.ts.map