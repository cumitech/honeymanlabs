"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).send("Unauthorized");
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
    }
    catch {
        return res.status(401).send("Unauthorized");
    }
    next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map