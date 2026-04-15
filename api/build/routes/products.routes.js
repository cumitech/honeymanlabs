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
    const normalized = { ...body };
    normalized.product_type =
        typeof normalized.product_type === "string" && (0, product_types_1.isProductType)(normalized.product_type)
            ? normalized.product_type
            : product_types_1.DEFAULT_PRODUCT_TYPE;
    normalized.weight_grams = toNullableNumber(normalized.weight_grams);
    normalized.liters = toNullableNumber(normalized.liters);
    if (normalized.apparel_size === "" || normalized.apparel_size === undefined) {
        normalized.apparel_size = null;
    }
    else if (typeof normalized.apparel_size === "string" &&
        (0, product_types_1.isApparelSize)(normalized.apparel_size)) {
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