"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodIssues = formatZodIssues;
exports.sendValidationError = sendValidationError;
/** Flatten Zod issues for JSON responses */
function formatZodIssues(error) {
    return error.issues.map((issue) => ({
        path: issue.path.length ? issue.path.map(String).join(".") : "(root)",
        message: issue.message,
    }));
}
/** Standard 400 response for failed body validation */
function sendValidationError(res, error) {
    return res.status(400).json({
        message: "Validation failed",
        errors: formatZodIssues(error),
    });
}
//# sourceMappingURL=errors.js.map