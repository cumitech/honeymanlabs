import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { PERMISSIONS } from "../../common/constants/app-constants";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorizePermissions } from "../../common/middleware/role.middleware";
import { ArticlesController } from "./articles.controller";
import { ArticlesRepository } from "./articles.repository";
import { createArticleSchema, updateArticleSchema } from "./articles.schema";
import { ArticlesService } from "./articles.service";

const router = Router();
const repository = new ArticlesRepository();
const service = new ArticlesService(repository);
const controller = new ArticlesController(service);

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.MANAGE_CONTENT, PERMISSIONS.WRITE),
  validateRequest({ body: createArticleSchema }),
  controller.create,
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.MANAGE_CONTENT, PERMISSIONS.WRITE),
  validateRequest({ body: updateArticleSchema }),
  controller.update,
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.MANAGE_CONTENT, PERMISSIONS.DELETE),
  controller.remove,
);

export default router;
