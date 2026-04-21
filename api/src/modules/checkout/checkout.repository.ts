import { sequelize } from "../../database/database";
import { CartItem, Order, OrderItem, Product } from "../../database/models";

export type CheckoutRepoLine = {
  catalogProductId: string;
  quantity: number;
};

export type UserCartLine = {
  productId: string;
  quantity: number;
};

export class CheckoutRepository {
  async listUserCartLines(userId: string): Promise<UserCartLine[]> {
    const rows = await CartItem.findAll({ where: { user_id: userId } });
    return rows.map((row) => ({ productId: row.product_id, quantity: row.quantity }));
  }

  async createOrderFromLines(input: {
    userId: string;
    lang: "en" | "fr";
    lines: CheckoutRepoLine[];
    clearEntireCart: boolean;
  }): Promise<Order> {
    const merged = new Map<string, number>();
    for (const line of input.lines) {
      merged.set(line.catalogProductId, (merged.get(line.catalogProductId) ?? 0) + line.quantity);
    }
    const productIds = [...merged.keys()];

    return sequelize.transaction(async (transaction) => {
      const products = await Product.findAll({
        where: { id: productIds },
        transaction,
      });

      if (products.length !== productIds.length) {
        const foundIds = new Set(products.map((product) => product.id));
        const missingId = productIds.find((id) => !foundIds.has(id));
        throw new Error(`UNKNOWN_PRODUCT:${missingId ?? "unknown"}`);
      }

      const byId = new Map(products.map((product) => [product.id, product]));
      const orderLines: Array<{
        catalog_product_id: string;
        category_id: string;
        sub_category_id: string | null;
        measurement_type: string | null;
        measurement_unit: string | null;
        measurement_value: number | null;
        apparel_size: string | null;
        product_name: string;
        unit_price: number;
        quantity: number;
        line_total: number;
      }> = [];

      for (const [productId, quantity] of merged.entries()) {
        const product = byId.get(productId);
        if (!product) throw new Error(`UNKNOWN_PRODUCT:${productId}`);

        const unitPrice = Number(product.price);
        if (!Number.isFinite(unitPrice) || unitPrice < 0) {
          throw new Error(`BAD_PRICE:${productId}`);
        }
        if (quantity > product.stock_quantity) {
          throw new Error(`OUT_OF_STOCK:${product.name}`);
        }

        orderLines.push({
          catalog_product_id: product.id,
          category_id: product.category_id,
          sub_category_id: product.sub_category_id ?? null,
          measurement_type: product.measurement_type ?? null,
          measurement_unit: product.measurement_unit ?? null,
          measurement_value:
            product.measurement_value === null ? null : Number(product.measurement_value),
          apparel_size: product.apparel_size ?? null,
          product_name: product.name,
          unit_price: unitPrice,
          quantity,
          line_total: unitPrice * quantity,
        });
      }

      const total = orderLines.reduce((sum, line) => sum + line.line_total, 0);
      const order = await Order.create(
        {
          user_id: input.userId,
          lang: input.lang,
          status: "pending",
          total_price: total,
          payment_status: "unpaid",
        },
        { transaction },
      );

      await OrderItem.bulkCreate(
        orderLines.map((line) => ({ ...line, order_id: order.id })),
        { transaction, individualHooks: true },
      );

      for (const [productId, quantity] of merged.entries()) {
        await Product.decrement("stock_quantity", {
          by: quantity,
          where: { id: productId },
          transaction,
        });
      }

      if (input.clearEntireCart) {
        await CartItem.destroy({ where: { user_id: input.userId }, transaction });
      } else {
        await CartItem.destroy({
          where: { user_id: input.userId, product_id: productIds },
          transaction,
        });
      }

      return order;
    });
  }
}

