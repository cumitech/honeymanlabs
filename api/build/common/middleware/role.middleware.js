"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).send("Forbidden");
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=role.middleware.js.map