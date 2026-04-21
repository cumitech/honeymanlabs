import { z } from "zod";
import { WishlistRepository } from "./wishlist.repository";
import { WishlistService } from "./wishlist.service";

const wishlistBodySchema = z.object({
  product_id: z.string().min(1).max(32),
});

function currentUserId(req: any): string | null {
  const userId = req.user?.userId;
  return typeof userId === "string" && userId.length > 0 ? userId : null;
}

const service = new WishlistService(new WishlistRepository());

export async function listWishlistItemsHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const rows = await service.list(userId);
  return res.status(200).json(rows);
}

export async function addWishlistItemHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const parsed = wishlistBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid wishlist payload", issues: parsed.error.issues });
  }

  try {
    const result = await service.add(userId, parsed.data.product_id);
    return res.status(result.created ? 201 : 200).json(result.item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update wishlist";
    if (message === "PRODUCT_NOT_FOUND") return res.status(404).json({ message: "Product not found" });
    return res.status(500).json({ message: "Could not update wishlist" });
  }
}

export async function removeWishlistItemHandler(req: any, res: any) {
  const userId = currentUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const productId = String(req.params?.productId ?? "");
  try {
    await service.remove(userId, productId);
    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not remove wishlist item";
    if (message === "WISHLIST_ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    return res.status(500).json({ message: "Could not remove wishlist item" });
  }
}

