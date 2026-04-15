"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_contants_1 = require("../common/constants/app-contants");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const crudConfigs = {
    users: {
        model: models_1.User,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_USERS],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_USERS],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_USERS],
    },
    events: {
        model: models_1.Event,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    article_categories: {
        model: models_1.ArticleCategory,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    newsletter_subscribers: {
        model: models_1.NewsletterSubscriber,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    beekeeper_applications: {
        model: models_1.BeekeeperApplication,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    beekeepers: {
        model: models_1.Beekeeper,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE],
    },
    apiaries: {
        model: models_1.Apiary,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE],
    },
    honey_batches: {
        model: models_1.HoneyBatch,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE],
    },
    lab_tests: {
        model: models_1.LabTest,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_LAB],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_LAB],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_LAB],
    },
    lab_results: {
        model: models_1.LabResult,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_LAB],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_LAB],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_LAB],
    },
    orders: {
        model: models_1.Order,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE],
    },
    products: {
        model: models_1.Product,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    product_images: {
        model: models_1.ProductImage,
        readPermissions: [app_contants_1.PERMISSIONS.READ],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_CONTENT],
    },
    sessions: {
        model: models_1.Session,
        readPermissions: [app_contants_1.PERMISSIONS.READ, app_contants_1.PERMISSIONS.MANAGE_USERS],
        writePermissions: [app_contants_1.PERMISSIONS.WRITE, app_contants_1.PERMISSIONS.MANAGE_USERS],
        deletePermissions: [app_contants_1.PERMISSIONS.DELETE, app_contants_1.PERMISSIONS.MANAGE_USERS],
    },
};
function toPagination(req) {
    const start = req.query._start ? Number(req.query._start) : undefined;
    const end = req.query._end ? Number(req.query._end) : undefined;
    const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
    return { start, limit };
}
function registerCrudRoutes(router, resource, config) {
    router.get(`/${resource}`, auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...config.readPermissions), async (req, res) => {
        const { start, limit } = toPagination(req);
        const { rows, count } = await config.model.findAndCountAll({
            ...(typeof start === "number" ? { offset: start } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
            order: [["created_at", "DESC"]],
        });
        res.setHeader("X-Total-Count", String(count));
        return res.status(200).json(rows);
    });
    router.get(`/${resource}/:id`, auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...config.readPermissions), async (req, res) => {
        const data = await config.model.findByPk(req.params.id);
        if (!data)
            return res.status(404).json({ message: `${resource} not found` });
        return res.status(200).json(data);
    });
    router.post(`/${resource}`, auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...config.writePermissions), async (req, res) => {
        const data = await config.model.create(req.body);
        return res.status(201).json(data);
    });
    router.put(`/${resource}/:id`, auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...config.writePermissions), async (req, res) => {
        const item = await config.model.findByPk(req.params.id);
        if (!item)
            return res.status(404).json({ message: `${resource} not found` });
        const updated = await item.update(req.body);
        return res.status(200).json(updated);
    });
    router.delete(`/${resource}/:id`, auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...config.deletePermissions), async (req, res) => {
        const item = await config.model.findByPk(req.params.id);
        if (!item)
            return res.status(404).json({ message: `${resource} not found` });
        await item.destroy();
        return res.status(204).send();
    });
}
const crudRouter = (0, express_1.Router)();
Object.entries(crudConfigs).forEach(([resource, config]) => {
    registerCrudRoutes(crudRouter, resource, config);
});
exports.default = crudRouter;
//# sourceMappingURL=crud.routes.js.map