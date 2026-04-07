"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalUrlString = exports.requiredString = exports.passwordField = exports.emailField = void 0;
const zod_1 = require("zod");
/** Reusable email field for request bodies */
const emailField = () => zod_1.z.string().min(1, "Email is required").email("Invalid email address");
exports.emailField = emailField;
/** Reusable password field (minimum length) */
const passwordField = (min = 8) => zod_1.z.string().min(min, `Password must be at least ${min} characters`);
exports.passwordField = passwordField;
/** Non-empty trimmed string */
const requiredString = (fieldLabel) => zod_1.z.string().trim().min(1, `${fieldLabel} is required`);
exports.requiredString = requiredString;
/** Optional absolute URL (omit undefined; use in .optional() chains) */
const optionalUrlString = () => zod_1.z.string().url("Invalid URL");
exports.optionalUrlString = optionalUrlString;
//# sourceMappingURL=rules.js.map