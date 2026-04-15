"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_contants_1 = require("../common/constants/app-contants");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const resource_route_handlers_1 = require("./handlers/resource-route-handlers");
const router = (0, express_1.Router)();
const options = { resourceName: "newsletter_subscribers" };
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_route_handlers_1.listHandler)(models_1.NewsletterSubscriber, options));
router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_route_handlers_1.getByIdHandler)(models_1.NewsletterSubscriber, options));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_route_handlers_1.createHandler)(models_1.NewsletterSubscriber, options));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_route_handlers_1.updateHandler)(models_1.NewsletterSubscriber, options));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_route_handlers_1.deleteHandler)(models_1.NewsletterSubscriber, options));
exports.default = router;
//# sourceMappingURL=newsletter-subscribers.routes.js.map