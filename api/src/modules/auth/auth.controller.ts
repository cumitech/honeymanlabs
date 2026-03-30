import type { Request, Response } from "express";
import type { TypedRequestBody } from "zod-express-middleware";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

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
    } catch {
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

  me = async (req: Request & { user?: unknown }, res: Response) => {
    return res.status(200).json({ user: req.user ?? null });
  };
}
