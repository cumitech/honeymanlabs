import { ArticleCategory } from "../../database/models";

export function mapArticleCategoryResponse(item: ArticleCategory) {
  const json = item.toJSON() as Record<string, unknown>;
  return {
    ...json,
    title: json.name,
  };
}

export function mapArticleCategoryPayload(body: Record<string, unknown>) {
  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  return {
    ...body,
    ...(title ? { name: title } : {}),
  };
}
