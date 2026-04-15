import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { ArticleCategory } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";
import {
  mapArticleCategoryPayload,
  mapArticleCategoryResponse,
} from "../modules/article-categories/article-categories.mapper";

const router = Router();
const options = {
  resourceName: "article_categories",
  mapRequest: mapArticleCategoryPayload,
  mapResponse: mapArticleCategoryResponse,
};

router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(ArticleCategory, options));

router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(ArticleCategory, options),
);

router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(ArticleCategory, options),
);

router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(ArticleCategory, options),
);

router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(ArticleCategory, options),
);

export default router;
