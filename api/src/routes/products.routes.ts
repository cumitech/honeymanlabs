import { Router } from "express";
import { PERMISSIONS } from "../common/constants/app-constants";
import {
  isApparelSize,
  isMeasurementType,
  isMeasurementUnit,
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
  const toNumber = (v: unknown, fallback = 0): number => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const normalized: Record<string, unknown> = { ...body };

  normalized.category_id =
    typeof normalized.category_id === "string" && normalized.category_id.trim().length > 0
      ? normalized.category_id.trim()
      : normalized.category_id;

  normalized.sub_category_id =
    typeof normalized.sub_category_id === "string" && normalized.sub_category_id.trim().length > 0
      ? normalized.sub_category_id.trim()
      : null;

  normalized.measurement_type =
    typeof normalized.measurement_type === "string" && isMeasurementType(normalized.measurement_type)
      ? normalized.measurement_type
      : "MASS";

  normalized.measurement_unit =
    typeof normalized.measurement_unit === "string" && isMeasurementUnit(normalized.measurement_unit)
      ? normalized.measurement_unit
      : "GRAM";

  normalized.measurement_value = toNumber(normalized.measurement_value, 0);

  const netGramsRaw = toNullableNumber(normalized.net_grams ?? normalized.weight_grams);
  const netMillilitersRaw = toNullableNumber(normalized.net_milliliters ?? normalized.liters);
  normalized.net_grams = netGramsRaw;
  normalized.net_milliliters = netMillilitersRaw;

  if (normalized.attributes === undefined || normalized.attributes === "") {
    normalized.attributes = null;
  }

  if (normalized.apparel_size === "" || normalized.apparel_size === undefined) {
    normalized.apparel_size = null;
  } else if (typeof normalized.apparel_size === "string" && isApparelSize(normalized.apparel_size)) {
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
