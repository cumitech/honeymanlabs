import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Order } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "orders" };
router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(Order, options));
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(Order, options),
);
router.post("/", authenticate, authorizePermissions(PERMISSIONS.WRITE), createHandler(Order, options));
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE),
  updateHandler(Order, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE),
  deleteHandler(Order, options),
);

export default router;
