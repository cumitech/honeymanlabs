import { Router, type Request, type Response } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Event } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "events" };

router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(Event, options));
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(Event, options),
);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(Event, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(Event, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(Event, options),
);

export default router;
