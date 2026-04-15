"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const app_constants_1 = require("../../common/constants/app-constants");
const validation_1 = require("../../common/validation");
/** Auth register body — aligns with `User` (`firstname`, `lastname`, …) */
exports.registerSchema = zod_1.z.object({
    firstname: (0, validation_1.requiredString)("First name"),
    lastname: (0, validation_1.requiredString)("Last name"),
    email: (0, validation_1.emailField)(),
    password: (0, validation_1.passwordField)(8),
    phone: (0, validation_1.requiredString)("Phone"),
    role: zod_1.z.nativeEnum(app_constants_1.USER_ROLES).optional(),
    location: zod_1.z.string().optional(),
    avatar_url: (0, validation_1.optionalUrlString)().optional(),
});
/** Auth login body */
exports.loginSchema = zod_1.z.object({
    email: (0, validation_1.emailField)(),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: (0, validation_1.emailField)(),
});
//# sourceMappingURL=auth.schema.js.map