import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { CartItem, Product } from "../../database/models";

export class CartRepository {
  async listByUserId(userId: string) {
    return CartItem.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
      order: [["created_at", "DESC"]],
    });
  }

  async findProductById(productId: string) {
    return Product.findByPk(productId);
  }

  async findCartItem(userId: string, productId: string) {
    return CartItem.findOne({ where: { user_id: userId, product_id: productId } });
  }

  async createCartItem(userId: string, productId: string, quantity: number) {
    return CartItem.create({
      user_id: userId,
      product_id: productId,
      quantity,
      lang: CONTENT_LANGUAGES.EN,
    });
  }

  async updateCartItemQuantity(item: CartItem, quantity: number) {
    return item.update({ quantity });
  }

  async removeCartItem(userId: string, productId: string) {
    return CartItem.destroy({ where: { user_id: userId, product_id: productId } });
  }

  async clearUserCart(userId: string) {
    return CartItem.destroy({ where: { user_id: userId } });
  }
}

