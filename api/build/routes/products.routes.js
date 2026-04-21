"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_constants_1 = require("../common/constants/app-constants");
const product_types_1 = require("../common/constants/product-types");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const models_1 = require("../database/models");
const resource_handlers_1 = require("./handlers/resource-handlers");
function mapProductBody(body) {
    const toNullableNumber = (v) => {
        if (v === "" || v === undefined || v === null)
            return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    };
    const toNumber = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };
    const normalized = { ...body };
    normalized.category_id =
        typeof normalized.category_id === "string" && normalized.category_id.trim().length > 0
            ? normalized.category_id.trim()
            : normalized.category_id;
    normalized.sub_category_id =
        typeof normalized.sub_category_id === "string" && normalized.sub_category_id.trim().length > 0
            ? normalized.sub_category_id.trim()
            : null;
    normalized.measurement_type =
        typeof normalized.measurement_type === "string" && (0, product_types_1.isMeasurementType)(normalized.measurement_type)
            ? normalized.measurement_type
            : "MASS";
    normalized.measurement_unit =
        typeof normalized.measurement_unit === "string" && (0, product_types_1.isMeasurementUnit)(normalized.measurement_unit)
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
    }
    else if (typeof normalized.apparel_size === "string" && (0, product_types_1.isApparelSize)(normalized.apparel_size)) {
        normalized.apparel_size = normalized.apparel_size;
    }
    else {
        normalized.apparel_size = null;
    }
    return normalized;
}
const router = (0, express_1.Router)();
const options = { resourceName: "products", mapRequest: mapProductBody };
router.get("/", (0, resource_handlers_1.listHandler)(models_1.Product, options));
router.get("/:id", (0, resource_handlers_1.getByIdHandler)(models_1.Product, options));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.WRITE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.createHandler)(models_1.Product, options));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.WRITE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.updateHandler)(models_1.Product, options));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorizePermissions)(app_constants_1.PERMISSIONS.DELETE, app_constants_1.PERMISSIONS.MANAGE_CONTENT), (0, resource_handlers_1.deleteHandler)(models_1.Product, options));
exports.default = router;
//# sourceMappingURL=products.routes.js.map