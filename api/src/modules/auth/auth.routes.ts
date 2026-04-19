import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { PERMISSIONS } from "../../common/constants/app-constants";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorizePermissions } from "../../common/middleware/role.middleware";
import { loginLimiter } from "../../common/middleware/rate-limit.middleware";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import {
    forgotPasswordSchema,
    loginSchema,
    refreshSchema,
    registerSchema,
    socialFacebookSchema,
    socialGoogleSchema,
    updateMeSchema,
} from "./auth.schema";

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
router.post(
    "/social/google",
    loginLimiter,
    validateRequest({ body: socialGoogleSchema }),
    controller.socialGoogle
);
router.post(
    "/social/facebook",
    loginLimiter,
    validateRequest({ body: socialFacebookSchema }),
    controller.socialFacebook
);
router.post(
    "/refresh",
    validateRequest({ body: refreshSchema }),
    controller.refresh
);
router.post(
    "/forgot-password",
    validateRequest({ body: forgotPasswordSchema }),
    controller.forgotPassword
);

router.patch(
    "/me",
    authenticate,
    authorizePermissions(PERMISSIONS.READ),
    validateRequest({ body: updateMeSchema }),
    controller.patchMe
);
router.get(
    "/me",
    authenticate,
    authorizePermissions(PERMISSIONS.READ),
    controller.me
);
router.get(
    "/capabilities/admin",
    authenticate,
    authorizePermissions(PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_CONTENT),
    controller.adminCapabilities
);
router.get(
    "/capabilities/content-write",
    authenticate,
    authorizePermissions(PERMISSIONS.WRITE),
    controller.contentWriteCapabilities
);

export default router;

