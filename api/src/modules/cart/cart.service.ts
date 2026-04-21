import { CartRepository } from "./cart.repository";

export class CartService {
  constructor(private readonly repo: CartRepository) {}

  async listCartItems(userId: string) {
    return this.repo.listByUserId(userId);
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.repo.findProductById(productId);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");

    const existing = await this.repo.findCartItem(userId, productId);
    if (!existing) {
      return { statusCode: 201, item: await this.repo.createCartItem(userId, productId, quantity) };
    }

    const nextQuantity = Math.min(99, existing.quantity + quantity);
    return { statusCode: 200, item: await this.repo.updateCartItemQuantity(existing, nextQuantity) };
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    const row = await this.repo.findCartItem(userId, productId);
    if (!row) throw new Error("CART_ITEM_NOT_FOUND");
    return this.repo.updateCartItemQuantity(row, quantity);
  }

  async removeItem(userId: string, productId: string) {
    const deleted = await this.repo.removeCartItem(userId, productId);
    if (!deleted) throw new Error("CART_ITEM_NOT_FOUND");
  }

  async clear(userId: string) {
    await this.repo.clearUserCart(userId);
  }
}

