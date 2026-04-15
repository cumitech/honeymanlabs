"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHandler = listHandler;
exports.getByIdHandler = getByIdHandler;
exports.createHandler = createHandler;
exports.updateHandler = updateHandler;
exports.deleteHandler = deleteHandler;
function toPagination(req) {
    const start = req.query._start ? Number(req.query._start) : undefined;
    const end = req.query._end ? Number(req.query._end) : undefined;
    const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
    return { start, limit };
}
function mapOut(item, mapResponse) {
    return mapResponse ? mapResponse(item) : item;
}
function listHandler(model, options) {
    return async (req, res) => {
        const { start, limit } = toPagination(req);
        const { rows, count } = await model.findAndCountAll({
            ...(typeof start === "number" ? { offset: start } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
            order: [["created_at", "DESC"]],
        });
        res.setHeader("X-Total-Count", String(count));
        return res.status(200).json(rows.map((item) => mapOut(item, options.mapResponse)));
    };
}
function getByIdHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const item = await model.findByPk(id);
        if (!item)
            return res.status(404).json({ message: `${options.resourceName} not found` });
        return res.status(200).json(mapOut(item, options.mapResponse));
    };
}
function createHandler(model, options) {
    return async (req, res) => {
        const payload = options.mapRequest
            ? options.mapRequest(req.body)
            : req.body;
        const item = await model.create(payload);
        return res.status(201).json(mapOut(item, options.mapResponse));
    };
}
function updateHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const item = await model.findByPk(id);
        if (!item)
            return res.status(404).json({ message: `${options.resourceName} not found` });
        const payload = options.mapRequest
            ? options.mapRequest(req.body)
            : req.body;
        const updated = await item.update(payload);
        return res.status(200).json(mapOut(updated, options.mapResponse));
    };
}
function deleteHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const item = await model.findByPk(id);
        if (!item)
            return res.status(404).json({ message: `${options.resourceName} not found` });
        await item.destroy();
        return res.status(204).send();
    };
}
//# sourceMappingURL=crud-handlers.js.map