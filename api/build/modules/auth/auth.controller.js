"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res) => {
        try {
            const userData = req.body;
            const result = await this.authService.register(userData);
            return res.status(201).json(result);
        }
        catch {
            return res.status(500).json({ message: "Failed to register" });
        }
    };
    login = async (req, res) => {
        try {
            const result = await this.authService.login({
                email: req.body.email,
                password: req.body.password,
            });
            return res.status(200).json(result);
        }
        catch {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    };
    me = async (req, res) => {
        return res.status(200).json({ user: req.user ?? null });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map