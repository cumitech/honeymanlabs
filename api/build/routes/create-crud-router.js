"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudRouter = createCrudRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
function toPagination(req) {
    const start = req.query._start ? Number(req.query._start) : undefined;
    const end = req.query._end ? Number(req.query._end) : undefined;
    const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
    return { start, limit };
}
function createCrudRouter(config) {
    const router = (0, express_1.Router)();
    const { resourceName, model, readPermissions, writePermissions, deletePermissions } = config;
    router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...readPermissions), async (req, res) => {
        const { start, limit } = toPagination(req);
        const { rows, count } = await model.findAndCountAll({
            ...(typeof start === "number" ? { offset: start } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
            order: [["created_at", "DESC"]],
        });
        res.setHeader("X-Total-Count", String(count));
        return res.status(200).json(rows);
    });
    router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...readPermissions), async (req, res) => {
        const data = await model.findByPk(req.params.id);
        if (!data)
            return res.status(404).json({ message: `${resourceName} not found` });
        return res.status(200).json(data);
    });
    router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...writePermissions), async (req, res) => {
        const data = await model.create(req.body);
        return res.status(201).json(data);
    });
    router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...writePermissions), async (req, res) => {
        const item = await model.findByPk(req.params.id);
        if (!item)
            return res.status(404).json({ message: `${resourceName} not found` });
        const updated = await item.update(req.body);
        return res.status(200).json(updated);
    });
    router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(...deletePermissions), async (req, res) => {
        const item = await model.findByPk(req.params.id);
        if (!item)
            return res.status(404).json({ message: `${resourceName} not found` });
        await item.destroy();
        return res.status(204).send();
    });
    return router;
}
//# sourceMappingURL=create-crud-router.js.map