"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesController = void 0;
function getLanguage(req) {
    return req.header("x-language") === "fr" ? "fr" : "en";
}
class ArticlesController {
    constructor(service) {
        this.service = service;
        this.list = async (req, res) => {
            const start = req.query._start ? Number(req.query._start) : undefined;
            const end = req.query._end ? Number(req.query._end) : undefined;
            const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
            const language = getLanguage(req);
            const statusParam = req.query.status;
            const status = typeof statusParam === "string" &&
                (statusParam === "draft" || statusParam === "published" || statusParam === "archived")
                ? statusParam
                : undefined;
            const { rows, count } = await this.service.list(language, start, limit, status);
            res.setHeader("X-Total-Count", String(count));
            return res.status(200).json(rows);
        };
        this.getById = async (req, res) => {
            const language = getLanguage(req);
            const data = await this.service.getById(req.params.id, language);
            if (!data) {
                return res.status(404).json({ message: "Article not found" });
            }
            return res.status(200).json(data);
        };
        this.create = async (req, res) => {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const language = getLanguage(req);
            const data = await this.service.create(req.user, language, {
                ...req.body,
                published_at: req.body.published_at ? new Date(req.body.published_at) : null,
            });
            return res.status(201).json(data);
        };
        this.update = async (req, res) => {
            const language = getLanguage(req);
            const data = await this.service.update(req.params.id, language, {
                ...req.body,
                published_at: req.body.published_at ? new Date(req.body.published_at) : undefined,
            });
            if (!data) {
                return res.status(404).json({ message: "Article not found" });
            }
            return res.status(200).json(data);
        };
        this.remove = async (req, res) => {
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "Article not found" });
            }
            return res.status(204).send();
        };
        this.comments = async (req, res) => {
            const language = getLanguage(req);
            const rows = await this.service.listComments(req.params.id, language);
            return res.status(200).json(rows);
        };
        this.addComment = async (req, res) => {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const language = getLanguage(req);
            const data = await this.service.addComment(req.user, req.params.id, language, req.body.content);
            return res.status(201).json(data);
        };
        this.toggleLike = async (req, res) => {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const language = getLanguage(req);
            const data = await this.service.toggleLike(req.user, req.params.id, language);
            return res.status(200).json(data);
        };
    }
}
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=articles.controller.js.map