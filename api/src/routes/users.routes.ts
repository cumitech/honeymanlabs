import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { User } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "users" };

router.get(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_USERS),
  listHandler(User, options),
);
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_USERS),
  getByIdHandler(User, options),
);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_USERS),
  createHandler(User, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_USERS),
  updateHandler(User, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_USERS),
  deleteHandler(User, options),
);

export default router;
