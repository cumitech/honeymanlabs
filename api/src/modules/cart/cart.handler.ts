import { z } from "zod";
import { CartRepository } from "./cart.repository";
import { CartService } from "./cart.service";

const cartBodySchema = z.object({
  product_id: z.string().min(1).max(32),
  quantity: z.number().int().min(1).max(99).default(1),
});

const quantityBodySchema = z.object({
  quantity: z.number().int().min(1).max(99),
});

function currentUserId(req: any): string | null {
  const userId = req.user?.userId;
  return typeof userId === "string" && userId.length > 0 ? userId : null;
}

const service = new CartService(new CartRepository());

export async function listCartItemsHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const rows = await service.listCartItems(userId);
  return res.status(200).json(rows);
}

export async function upsertCartItemHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const parsed = cartBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid cart payload", issues: parsed.error.issues });
  }

  try {
    const result = await service.addToCart(userId, parsed.data.product_id, parsed.data.quantity);
    return res.status(result.statusCode).json(result.item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update cart";
    if (message === "PRODUCT_NOT_FOUND") return res.status(404).json({ message: "Product not found" });
    return res.status(500).json({ message: "Could not update cart" });
  }
}

export async function updateCartItemQuantityHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const parsed = quantityBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid quantity payload", issues: parsed.error.issues });
  }

  const productId = String(req.params?.productId ?? "");
  try {
    const updated = await service.updateQuantity(userId, productId, parsed.data.quantity);
    return res.status(200).json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update cart item";
    if (message === "CART_ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.status(500).json({ message: "Could not update cart item" });
  }
}

export async function removeCartItemHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const productId = String(req.params?.productId ?? "");
  try {
    await service.removeItem(userId, productId);
    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not remove cart item";
    if (message === "CART_ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.status(500).json({ message: "Could not remove cart item" });
  }
}

export async function clearCartHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  await service.clear(userId);
  return res.status(204).send();
}

