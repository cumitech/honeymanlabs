import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Apiary } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "apiaries" };

router.get("/", authenticate, authorizePermissions(PERMISSIONS.READ), listHandler(Apiary, options));
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ),
  getByIdHandler(Apiary, options),
);
router.post("/", authenticate, authorizePermissions(PERMISSIONS.WRITE), createHandler(Apiary, options));
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE),
  updateHandler(Apiary, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE),
  deleteHandler(Apiary, options),
);

export default router;
