import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { ProductSubCategory } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "product_sub_categories" };

router.get("/", listHandler(ProductSubCategory, options));
router.get("/:id", getByIdHandler(ProductSubCategory, options));
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(ProductSubCategory, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(ProductSubCategory, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(ProductSubCategory, options),
);

export default router;

