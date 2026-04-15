import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import { type AuthTokenPayload } from "../../common/utils/jwt";
import { AuthService } from "./auth.service";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.schema";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: TypedRequestBody<typeof registerSchema>,
    res: Response
  ) => {
    try {
      const userData = req.body;
      const result = await this.authService.register(userData);

      return res.status(201).json(result);
    } catch (error) {
      console.error("Register failed:", error);
      return res.status(500).json({ message: "Failed to register" });
    }
  };

  login = async (req: TypedRequestBody<typeof loginSchema>, res: Response) => {
    try {
      const result = await this.authService.login({
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(200).json(result);
    } catch {
      return res.status(401).json({ message: "Invalid credentials" });
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

  adminCapabilities = async (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ message: "You can manage users and content." });
  };

  contentWriteCapabilities = async (_req: Request, res: Response) => {
    return res.status(200).json({ message: "You can write content." });
  };
}
