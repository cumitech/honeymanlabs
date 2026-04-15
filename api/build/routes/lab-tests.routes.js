"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_contants_1 = require("../common/constants/app-contants");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const resource_route_handlers_1 = require("./handlers/resource-route-handlers");
const router = (0, express_1.Router)();
const options = { resourceName: "lab_tests" };
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_LAB), (0, resource_route_handlers_1.listHandler)(models_1.LabTest, options));
router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_LAB), (0, resource_route_handlers_1.getByIdHandler)(models_1.LabTest, options));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_LAB), (0, resource_route_handlers_1.createHandler)(models_1.LabTest, options));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_LAB), (0, resource_route_handlers_1.updateHandler)(models_1.LabTest, options));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_LAB), (0, resource_route_handlers_1.deleteHandler)(models_1.LabTest, options));
exports.default = router;
//# sourceMappingURL=lab-tests.routes.js.map