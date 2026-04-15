import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Session } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "sessions" };
router.get(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_USERS),
  listHandler(Session, options),
);
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_USERS),
  getByIdHandler(Session, options),
);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_USERS),
  createHandler(Session, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_USERS),
  updateHandler(Session, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_USERS),
  deleteHandler(Session, options),
);

export default router;
