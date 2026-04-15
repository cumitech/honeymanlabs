import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { HoneyBatch } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "honey_batches" };

router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(HoneyBatch, options));
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(HoneyBatch, options),
);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE),
  createHandler(HoneyBatch, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE),
  updateHandler(HoneyBatch, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE),
  deleteHandler(HoneyBatch, options),
);

export default router;
