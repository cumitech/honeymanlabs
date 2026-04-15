"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_contants_1 = require("../common/constants/app-contants");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const resource_route_handlers_1 = require("./handlers/resource-route-handlers");
const router = (0, express_1.Router)();
const options = { resourceName: "orders" };
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ), (0, resource_route_handlers_1.listHandler)(models_1.Order, options));
router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ), (0, resource_route_handlers_1.getByIdHandler)(models_1.Order, options));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE), (0, resource_route_handlers_1.createHandler)(models_1.Order, options));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE), (0, resource_route_handlers_1.updateHandler)(models_1.Order, options));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.DELETE), (0, resource_route_handlers_1.deleteHandler)(models_1.Order, options));
exports.default = router;
//# sourceMappingURL=orders.routes.js.map