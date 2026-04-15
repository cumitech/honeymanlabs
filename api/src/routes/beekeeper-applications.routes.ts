import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { BeekeeperApplication } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "beekeeper_applications" };

router.get(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_CONTENT),
  listHandler(BeekeeperApplication, options),
);

router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_CONTENT),
  getByIdHandler(BeekeeperApplication, options),
);

router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(BeekeeperApplication, options),
);

router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(BeekeeperApplication, options),
);

router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(BeekeeperApplication, options),
);

export default router;
