"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHandler = listHandler;
exports.getByIdHandler = getByIdHandler;
exports.createHandler = createHandler;
exports.updateHandler = updateHandler;
exports.deleteHandler = deleteHandler;
/** Equality filters from query string for list (e.g. product_id) — keys must exist on the model. */
function whereFromQuery(req, model) {
    const attrs = model.rawAttributes;
    if (!attrs)
        return {};
    const skip = new Set(["_start", "_end", "_sort", "_order", "lang", "q"]);
    const out = {};
    const q = req.query;
    for (const key of Object.keys(q)) {
        if (key.startsWith("_") || skip.has(key))
            continue;
        if (!(key in attrs))
            continue;
        const val = q[key];
        const str = Array.isArray(val) ? val[0] : val;
        if (typeof str === "string" && str.length > 0) {
            out[key] = str;
        }
    }
    return out;
}
function toPagination(req) {
    const start = req.query._start ? Number(req.query._start) : undefined;
    const end = req.query._end ? Number(req.query._end) : undefined;
    const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
    return { start, limit };
}
function mapOut(item, mapResponse) {
    return mapResponse ? mapResponse(item) : item;
}
function toLanguage(req) {
    const fromHeader = req.header("x-language");
    if (fromHeader === "fr")
        return "fr";
    if (fromHeader === "en")
        return "en";
    const fromQuery = typeof req.query.lang === "string" ? req.query.lang : null;
    if (fromQuery === "fr")
        return "fr";
    return "en";
}
function modelHasLanguage(model) {
    return !!model.rawAttributes?.lang;
}
function listHandler(model, options) {
    return async (req, res) => {
        const { start, limit } = toPagination(req);
        const language = toLanguage(req);
        const hasLanguage = modelHasLanguage(model);
        const queryWhere = whereFromQuery(req, model);
        const langWhere = hasLanguage ? { lang: language } : {};
        const where = { ...langWhere, ...queryWhere };
        const hasWhere = Object.keys(where).length > 0;
        const { rows, count } = await model.findAndCountAll({
            ...(typeof start === "number" ? { offset: start } : {}),
            ...(typeof limit === "number" ? { limit } : {}),
            ...(hasWhere ? { where } : {}),
            order: [["created_at", "DESC"]],
        });
        res.setHeader("X-Total-Count", String(count));
        return res.status(200).json(rows.map((item) => mapOut(item, options.mapResponse)));
    };
}
function getByIdHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const language = toLanguage(req);
        const item = await model.findByPk(id);
        if (item && modelHasLanguage(model) && item.lang !== language) {
            return res.status(404).json({ message: `${options.resourceName} not found` });
        }
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
        const language = toLanguage(req);
        const item = await model.create(modelHasLanguage(model)
            ? {
                ...payload,
                lang: language,
            }
            : payload);
        return res.status(201).json(mapOut(item, options.mapResponse));
    };
}
function updateHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const language = toLanguage(req);
        const item = await model.findByPk(id);
        if (item && modelHasLanguage(model) && item.lang !== language) {
            return res.status(404).json({ message: `${options.resourceName} not found` });
        }
        if (!item)
            return res.status(404).json({ message: `${options.resourceName} not found` });
        const payload = options.mapRequest
            ? options.mapRequest(req.body)
            : req.body;
        const updated = await item.update(modelHasLanguage(model)
            ? {
                ...payload,
                lang: language,
            }
            : payload);
        return res.status(200).json(mapOut(updated, options.mapResponse));
    };
}
function deleteHandler(model, options) {
    return async (req, res) => {
        const id = String(req.params?.id ?? "");
        const language = toLanguage(req);
        const item = await model.findByPk(id);
        if (item && modelHasLanguage(model) && item.lang !== language) {
            return res.status(404).json({ message: `${options.resourceName} not found` });
        }
        if (!item)
            return res.status(404).json({ message: `${options.resourceName} not found` });
        await item.destroy();
        return res.status(204).send();
    };
}
//# sourceMappingURL=resource-route-handlers.js.map