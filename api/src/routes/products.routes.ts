import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import {
  DEFAULT_PRODUCT_TYPE,
  isApparelSize,
  isProductType,
} from "../common/constants/product-types";
import { authenticate } from "../common/middleware/auth.middleware";
import { authorizePermissions } from "../common/middleware/role.middleware";
import { Product } from "../database/models";
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  listHandler,
  updateHandler,
} from "./handlers/resource-handlers";

function mapProductBody(body: Record<string, unknown>): Record<string, unknown> {
  const toNullableNumber = (v: unknown): number | null => {
    if (v === "" || v === undefined || v === null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const normalized: Record<string, unknown> = { ...body };

  normalized.product_type =
    typeof normalized.product_type === "string" && isProductType(normalized.product_type)
      ? normalized.product_type
      : DEFAULT_PRODUCT_TYPE;

  normalized.weight_grams = toNullableNumber(normalized.weight_grams);
  normalized.liters = toNullableNumber(normalized.liters);

  if (normalized.apparel_size === "" || normalized.apparel_size === undefined) {
    normalized.apparel_size = null;
  } else if (
    typeof normalized.apparel_size === "string" &&
    isApparelSize(normalized.apparel_size)
  ) {
    normalized.apparel_size = normalized.apparel_size;
  } else {
    normalized.apparel_size = null;
  }

  return normalized;
}

const router = Router();
const options = { resourceName: "products", mapRequest: mapProductBody };
router.get("/", listHandler(Product, options));
router.get("/:id", getByIdHandler(Product, options));
router.post(
  "/",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  createHandler(Product, options),
);
router.put(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.WRITE, PERMISSIONS.MANAGE_CONTENT),
  updateHandler(Product, options),
);
router.delete(
  "/:id",
  authenticate,
  authorizePermissions(PERMISSIONS.DELETE, PERMISSIONS.MANAGE_CONTENT),
  deleteHandler(Product, options),
);

export default router;
