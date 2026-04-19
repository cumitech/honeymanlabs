import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import { type AuthTokenPayload } from "../../common/utils/jwt";
import { AuthService } from "./auth.service";
import { signInAuditFromRequest } from "./sign-in-audit";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  socialFacebookSchema,
  socialGoogleSchema,
  updateMeSchema,
} from "./auth.schema";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: TypedRequestBody<typeof registerSchema>,
    res: Response
  ) => {
    try {
      const audit = signInAuditFromRequest(req, req.body);
      const result = await this.authService.register(req.body, audit);

      return res.status(201).json(result);
    } catch (error) {
      console.error("Register failed:", error);
      return res.status(500).json({ message: "Failed to register" });
    }
  };

  login = async (req: TypedRequestBody<typeof loginSchema>, res: Response) => {
    try {
      const audit = signInAuditFromRequest(req, req.body);
      const result = await this.authService.login(
        { email: req.body.email, password: req.body.password },
        audit,
      );

      return res.status(200).json(result);
    } catch {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  };

  socialGoogle = async (req: TypedRequestBody<typeof socialGoogleSchema>, res: Response) => {
    try {
      const audit = signInAuditFromRequest(req, req.body);
      const result = await this.authService.loginWithGoogleIdToken(req.body.idToken, audit);
      return res.status(200).json(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed";
      const status = msg.includes("not configured") ? 503 : 401;
      return res.status(status).json({ message: msg });
    }
  };

  socialFacebook = async (req: TypedRequestBody<typeof socialFacebookSchema>, res: Response) => {
    try {
      const audit = signInAuditFromRequest(req, req.body);
      const result = await this.authService.loginWithFacebookAccessToken(
        req.body.accessToken,
        audit,
      );
      return res.status(200).json(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Facebook sign-in failed";
      return res.status(401).json({ message: msg });
    }
  };

  refresh = async (req: TypedRequestBody<typeof refreshSchema>, res: Response) => {
    try {
      const result = await this.authService.refresh(req.body.refreshToken);
      return res.status(200).json(result);
    } catch {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
  };

  forgotPassword = async (
    req: TypedRequestBody<typeof forgotPasswordSchema>,
    res: Response,
  ) => {
    try {
      await this.authService.forgotPassword(req.body.email);
      return res.status(200).json({
        message:
          "If an account exists for this email, password reset instructions have been sent.",
      });
    } catch {
      return res.status(200).json({
        message:
          "If an account exists for this email, password reset instructions have been sent.",
      });
    }
  };

  me = async (req: Request & { user?: AuthTokenPayload }, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await this.authService.getProfile(req.user);
      return res.status(200).json({ user });
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };

  patchMe = async (req: Request & { user?: AuthTokenPayload }, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await this.authService.updateMyProfile(req.user, req.body);
      return res.status(200).json({ user });
    } catch {
      return res.status(400).json({ message: "Unable to update profile" });
    }
  };

  adminCapabilities = async (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ message: "You can manage users and content." });
  };

  contentWriteCapabilities = async (_req: Request, res: Response) => {
    return res.status(200).json({ message: "You can write content." });
  };
}
