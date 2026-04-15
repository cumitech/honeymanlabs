"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_constants_1 = require("../common/constants/app-constants");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const resource_handlers_1 = require("./handlers/resource-handlers");
const router = (0, express_1.Router)();
const options = { resourceName: "beekeeper_applications" };
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.READ, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.listHandler)(models_1.BeekeeperApplication, options));
router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.READ, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.getByIdHandler)(models_1.BeekeeperApplication, options));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.WRITE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.createHandler)(models_1.BeekeeperApplication, options));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.WRITE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.updateHandler)(models_1.BeekeeperApplication, options));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.DELETE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.deleteHandler)(models_1.BeekeeperApplication, options));
exports.default = router;
//# sourceMappingURL=beekeeper-applications.routes.js.map