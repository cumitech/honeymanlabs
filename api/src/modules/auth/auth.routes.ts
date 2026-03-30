import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { authenticate } from "../../common/middleware/auth.middleware";
import { loginLimiter } from "../../common/middleware/rate-limit.middleware";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

const router = Router();

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post(
    "/register",
    validateRequest({ body: registerSchema }),
    controller.register
);
router.post(
    "/login",
    loginLimiter,
    validateRequest({ body: loginSchema }),
    controller.login
);

router.get("/me", authenticate, controller.me);

export default router;

