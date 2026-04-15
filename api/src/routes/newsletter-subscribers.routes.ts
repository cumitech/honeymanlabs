import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { NewsletterSubscriber } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "newsletter_subscribers" };

router.get(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_CONTENT),
  listHandler(NewsletterSubscriber, options),
);

router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_CONTENT),
  getByIdHandler(NewsletterSubscriber, options),
);

router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(NewsletterSubscriber, options),
);

router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(NewsletterSubscriber, options),
);

router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(NewsletterSubscriber, options),
);

export default router;
