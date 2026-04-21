import { z } from "zod";
import { CheckoutRepository } from "./checkout.repository";
import { CheckoutService } from "./checkout.service";

const checkoutBodySchema = z.object({
  items: z
    .array(
      z.object({
        catalogProductId: z.string().min(1).max(32),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(50)
    .optional(),
});

const service = new CheckoutService(new CheckoutRepository());

export async function checkoutHandler(req: any, res: any) {
  const parsed = checkoutBodySchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid checkout payload", issues: parsed.error.issues });
  }

  const userId = req.user?.userId as string | undefined;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const order = await service.placeOrder({
      userId,
      lang: "en",
      ...(parsed.data.items ? { items: parsed.data.items } : {}),
    });

    return res.status(201).json({
      order,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create order";
    if (message === "CART_EMPTY") {
      return res.status(400).json({ message: "Cart is empty." });
    }
    if (message.startsWith("UNKNOWN_PRODUCT:")) {
      return res.status(400).json({ message: `Unknown product: ${message.split(":")[1] ?? "unknown"}` });
    }
    if (message.startsWith("OUT_OF_STOCK:")) {
      return res.status(400).json({ message: `Insufficient stock: ${message.split(":")[1] ?? "product"}` });
    }
    if (message.startsWith("BAD_PRICE:")) {
      return res.status(500).json({ message: "Invalid product configuration" });
    }

    console.error("checkout error", error);
    return res.status(500).json({ message: "Could not create order" });
  }
}

