import { WishlistRepository } from "./wishlist.repository";

export class WishlistService {
  constructor(private readonly repo: WishlistRepository) {}

  async list(userId: string) {
    return this.repo.listByUserId(userId);
  }

  async add(userId: string, productId: string) {
    const product = await this.repo.findProductById(productId);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    const [item, created] = await this.repo.findOrCreate(userId, productId);
    return { item, created };
  }

  async remove(userId: string, productId: string) {
    const deleted = await this.repo.remove(userId, productId);
    if (!deleted) throw new Error("WISHLIST_ITEM_NOT_FOUND");
  }
}

