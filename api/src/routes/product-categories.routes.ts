import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { ProductCategory } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "product_categories" };

router.get("/", listHandler(ProductCategory, options));
router.get("/:id", getByIdHandler(ProductCategory, options));
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(ProductCategory, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(ProductCategory, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(ProductCategory, options),
);

export default router;

