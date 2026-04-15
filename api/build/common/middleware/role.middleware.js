"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authorize = void 0;
const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send("Forbidden");
    }
    next();
};
exports.authorize = authorize;
const authorizePermissions = (...permissions) => (req, res, next) => {
    const userPermissions = req.user?.permissions ?? [];
    const hasAllPermissions = permissions.every((permission) => userPermissions.includes(permission));
    if (!hasAllPermissions) {
        return res.status(403).send("Forbidden");
    }
    next();
};
exports.authorizePermissions = authorizePermissions;
//# sourceMappingURL=role.middleware.js.map