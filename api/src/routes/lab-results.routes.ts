import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { LabResult } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

const router = Router();
const options = { resourceName: "lab_results" };
router.get(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_LAB),
  listHandler(LabResult, options),
);
router.get(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.READ, PERMISSIONS.MANAGE_LAB),
  getByIdHandler(LabResult, options),
);
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_LAB),
  createHandler(LabResult, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_LAB),
  updateHandler(LabResult, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_LAB),
  deleteHandler(LabResult, options),
);

export default router;
