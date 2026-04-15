import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import type { AuthTokenPayload } from "../../common/utils/jwt";
import { ArticlesService } from "./articles.service";
import { createArticleSchema, updateArticleSchema } from "./articles.schema";

type AuthenticatedRequest = Request & { user?: AuthTokenPayload };

function getLanguage(req: Request): "en" | "fr" {
  return req.header("x-language") === "fr" ? "fr" : "en";
}

export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  list = async (req: Request, res: Response) => {
    const start = req.query._start ? Number(req.query._start) : undefined;
    const end = req.query._end ? Number(req.query._end) : undefined;
    const limit =
      typeof start === "number" && typeof end === "number" ? end - start : undefined;

    const language = getLanguage(req);
    const { rows, count } = await this.service.list(language, start, limit);
    res.setHeader("X-Total-Count", String(count));
    return res.status(200).json(rows);
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const language = getLanguage(req);
    const data = await this.service.getById(req.params.id, language);
    if (!data) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.status(200).json(data);
  };

  create = async (
    req: TypedRequestBody<typeof createArticleSchema> & AuthenticatedRequest,
    res: Response,
  ) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const language = getLanguage(req);
    const data = await this.service.create(req.user, language, {
      ...req.body,
      published_at: req.body.published_at ? new Date(req.body.published_at) : null,
    });
    return res.status(201).json(data);
  };

  update = async (
    req: TypedRequestBody<typeof updateArticleSchema> & Request<{ id: string }>,
    res: Response,
  ) => {
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

  remove = async (req: Request<{ id: string }>, res: Response) => {
    const deleted = await this.service.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.status(204).send();
  };
}
