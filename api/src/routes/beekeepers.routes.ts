import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Beekeeper } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "beekeepers" };

router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(Beekeeper, options));
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(Beekeeper, options),
);
router.post("/", authenticate, authorizePermissions(PERMISSIONS.WRITE), createHandler(Beekeeper, options));
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE),
  updateHandler(Beekeeper, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE),
  deleteHandler(Beekeeper, options),
);

export default router;
