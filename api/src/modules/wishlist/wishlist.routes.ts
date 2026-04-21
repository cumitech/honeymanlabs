import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import {
  addWishlistItemHandler,
  listWishlistItemsHandler,
  removeWishlistItemHandler,
} from "./wishlist.handler";

const router = Router();

router.get("/items", authenticate, listWishlistItemsHandler);
router.post("/items", authenticate, addWishlistItemHandler);
router.delete("/items/:productId", authenticate, removeWishlistItemHandler);

export default router;

