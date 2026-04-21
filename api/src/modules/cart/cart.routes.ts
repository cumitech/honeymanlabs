import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import {
  clearCartHandler,
  listCartItemsHandler,
  removeCartItemHandler,
  updateCartItemQuantityHandler,
  upsertCartItemHandler,
} from "./cart.handler";

const router = Router();

router.get("/items", authenticate, listCartItemsHandler);
router.post("/items", authenticate, upsertCartItemHandler);
router.put("/items/:productId", authenticate, updateCartItemQuantityHandler);
router.delete("/items/:productId", authenticate, removeCartItemHandler);
router.delete("/items", authenticate, clearCartHandler);

export default router;

