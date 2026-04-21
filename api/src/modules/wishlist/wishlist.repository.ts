import { CONTENT_LANGUAGES } from "../../common/constants/app-constants";
import { Product, WishlistItem } from "../../database/models";

export class WishlistRepository {
  async listByUserId(userId: string) {
    return WishlistItem.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
      order: [["created_at", "DESC"]],
    });
  }

  async findProductById(productId: string) {
    return Product.findByPk(productId);
  }

  async findOrCreate(userId: string, productId: string) {
    return WishlistItem.findOrCreate({
      where: { user_id: userId, product_id: productId },
      defaults: {
        user_id: userId,
        product_id: productId,
        lang: CONTENT_LANGUAGES.EN,
      },
    });
  }

  async remove(userId: string, productId: string) {
    return WishlistItem.destroy({ where: { user_id: userId, product_id: productId } });
  }
}

