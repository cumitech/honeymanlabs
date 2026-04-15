import type { Request, RequestHandler, Response } from "express";

type CrudModel = {
  findAndCountAll: (options?: Record<string, unknown>) => Promise<{ rows: any[]; count: number }>;
  findByPk: (id: string) => Promise<any | null>;
  create: (data: Record<string, unknown>) => Promise<any>;
  rawAttributes?: Record<string, unknown>;
};

/** Equality filters from query string for list (e.g. product_id) — keys must exist on the model. */
function whereFromQuery(req: Request, model: CrudModel): Record<string, unknown> {
  const attrs = model.rawAttributes;
  if (!attrs) return {};

  const skip = new Set(["_start", "_end", "_sort", "_order", "lang", "q"]);
  const out: Record<string, unknown> = {};
  const q = req.query as Record<string, unknown>;
  for (const key of Object.keys(q)) {
    if (key.startsWith("_") || skip.has(key)) continue;
    if (!(key in attrs)) continue;
    const val = q[key];
    const str = Array.isArray(val) ? val[0] : val;
    if (typeof str === "string" && str.length > 0) {
      out[key] = str;
    }
  }
  return out;
}

type HandlerOptions<T = any> = {
  resourceName: string;
  mapRequest?: (body: Record<string, unknown>) => Record<string, unknown>;
  mapResponse?: (item: T) => unknown;
};

function toPagination(req: Request) {
  const start = req.query._start ? Number(req.query._start) : undefined;
  const end = req.query._end ? Number(req.query._end) : undefined;
  const limit = typeof start === "number" && typeof end === "number" ? end - start : undefined;
  return { start, limit };
}

function mapOut<T>(item: T, mapResponse?: (item: T) => unknown) {
  return mapResponse ? mapResponse(item) : item;
}

function toLanguage(req: Request): "en" | "fr" {
  const fromHeader = req.header("x-language");
  if (fromHeader === "fr") return "fr";
  if (fromHeader === "en") return "en";
  const fromQuery = typeof req.query.lang === "string" ? req.query.lang : null;
  if (fromQuery === "fr") return "fr";
  return "en";
}

function modelHasLanguage(model: CrudModel): boolean {
  return !!model.rawAttributes?.lang;
}

export function listHandler<T = any>(
  model: CrudModel,
  options: HandlerOptions<T>,
): RequestHandler {
  return async (req: Request, res: Response) => {
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

export function getByIdHandler<T = any>(
  model: CrudModel,
  options: HandlerOptions<T>,
): RequestHandler {
  return async (req: Request, res: Response) => {
    const id = String((req.params as Record<string, string | undefined>)?.id ?? "");
    const language = toLanguage(req);
    const item = await model.findByPk(id);
    if (item && modelHasLanguage(model) && item.lang !== language) {
      return res.status(404).json({ message: `${options.resourceName} not found` });
    }
    if (!item) return res.status(404).json({ message: `${options.resourceName} not found` });
    return res.status(200).json(mapOut(item, options.mapResponse));
  };
}

export function createHandler<T = any>(
  model: CrudModel,
  options: HandlerOptions<T>,
): RequestHandler {
  return async (req: Request, res: Response) => {
    const payload = options.mapRequest
      ? options.mapRequest(req.body as Record<string, unknown>)
      : (req.body as Record<string, unknown>);
    const language = toLanguage(req);
    const item = await model.create(
      modelHasLanguage(model)
        ? {
            ...payload,
            lang: language,
          }
        : payload,
    );
    return res.status(201).json(mapOut(item, options.mapResponse));
  };
}

export function updateHandler<T = any>(
  model: CrudModel,
  options: HandlerOptions<T>,
): RequestHandler {
  return async (req: Request, res: Response) => {
    const id = String((req.params as Record<string, string | undefined>)?.id ?? "");
    const language = toLanguage(req);
    const item = await model.findByPk(id);
    if (item && modelHasLanguage(model) && item.lang !== language) {
      return res.status(404).json({ message: `${options.resourceName} not found` });
    }
    if (!item) return res.status(404).json({ message: `${options.resourceName} not found` });
    const payload = options.mapRequest
      ? options.mapRequest(req.body as Record<string, unknown>)
      : (req.body as Record<string, unknown>);
    const updated = await item.update(
      modelHasLanguage(model)
        ? {
            ...payload,
            lang: language,
          }
        : payload,
    );
    return res.status(200).json(mapOut(updated, options.mapResponse));
  };
}

export function deleteHandler(model: CrudModel, options: HandlerOptions): RequestHandler {
  return async (req: Request, res: Response) => {
    const id = String((req.params as Record<string, string | undefined>)?.id ?? "");
    const language = toLanguage(req);
    const item = await model.findByPk(id);
    if (item && modelHasLanguage(model) && item.lang !== language) {
      return res.status(404).json({ message: `${options.resourceName} not found` });
    }
    if (!item) return res.status(404).json({ message: `${options.resourceName} not found` });
    await item.destroy();
    return res.status(204).send();
  };
}
