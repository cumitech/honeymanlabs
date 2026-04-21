import { Router } from "express";
import { authenticate } from "../common/middleware/auth.middleware";
import { checkoutHandler } from "../modules/checkout/checkout.handler";

const router = Router();

router.post("/", authenticate, checkoutHandler);

export default router;
