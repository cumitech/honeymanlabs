"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeSchema = exports.socialFacebookSchema = exports.socialGoogleSchema = exports.refreshSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const app_constants_1 = require("../../common/constants/app-constants");
const validation_1 = require("../../common/validation");
const clientKindField = zod_1.z.enum(["web", "ios", "android"]).optional();
const deviceLabelField = zod_1.z.string().trim().max(255).optional();
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
    clientKind: clientKindField,
    deviceLabel: deviceLabelField,
});
/** Auth login body */
exports.loginSchema = zod_1.z.object({
    email: (0, validation_1.emailField)(),
    password: zod_1.z.string().min(1, "Password is required"),
    clientKind: clientKindField,
    deviceLabel: deviceLabelField,
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: (0, validation_1.emailField)(),
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
});
exports.socialGoogleSchema = zod_1.z.object({
    idToken: zod_1.z.string().min(20, "Invalid Google token"),
    clientKind: clientKindField,
    deviceLabel: deviceLabelField,
});
exports.socialFacebookSchema = zod_1.z.object({
    accessToken: zod_1.z.string().min(10, "Invalid Facebook token"),
    clientKind: clientKindField,
    deviceLabel: deviceLabelField,
});
exports.updateMeSchema = zod_1.z
    .object({
    firstname: zod_1.z.string().trim().min(1).max(50).optional(),
    lastname: zod_1.z.string().trim().min(1).max(50).optional(),
    avatar_url: zod_1.z.union([zod_1.z.string().url(), zod_1.z.null()]).optional(),
    phone: zod_1.z.string().trim().min(3).max(40).optional(),
    location: zod_1.z.union([zod_1.z.string().trim().max(200), zod_1.z.null()]).optional(),
})
    .refine((body) => Object.values(body).some((v) => v !== undefined), {
    message: "At least one field is required",
});
//# sourceMappingURL=auth.schema.js.map