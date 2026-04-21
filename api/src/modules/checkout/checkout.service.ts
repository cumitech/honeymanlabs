import { CheckoutRepository, type CheckoutRepoLine } from "./checkout.repository";

export class CheckoutService {
  constructor(private readonly repo: CheckoutRepository) {}

  async placeOrder(input: {
    userId: string;
    lang: "en" | "fr";
    items?: CheckoutRepoLine[];
  }): Promise<{
    id: string;
    total_price: number;
    status: string;
    payment_status: string;
  }> {
    const itemsFromBody = input.items ?? [];
    const cartLines =
      itemsFromBody.length === 0 ? await this.repo.listUserCartLines(input.userId) : [];

    const checkoutLines: CheckoutRepoLine[] =
      itemsFromBody.length > 0
        ? itemsFromBody
        : cartLines.map((line) => ({
            catalogProductId: line.productId,
            quantity: line.quantity,
          }));

    if (checkoutLines.length === 0) {
      throw new Error("CART_EMPTY");
    }

    const createdOrder = await this.repo.createOrderFromLines({
      userId: input.userId,
      lang: input.lang,
      lines: checkoutLines,
      clearEntireCart: itemsFromBody.length === 0,
    });

    return {
      id: createdOrder.id,
      total_price: Number(createdOrder.total_price),
      status: createdOrder.status,
      payment_status: createdOrder.payment_status,
    };
  }
}

