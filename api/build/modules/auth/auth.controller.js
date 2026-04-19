"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = async (req, res) => {
            try {
                const userData = req.body;
                const result = await this.authService.register(userData);
                return res.status(201).json(result);
            }
            catch (error) {
                console.error("Register failed:", error);
                return res.status(500).json({ message: "Failed to register" });
            }
        };
        this.login = async (req, res) => {
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
        this.refresh = async (req, res) => {
            try {
                const result = await this.authService.refresh(req.body.refreshToken);
                return res.status(200).json(result);
            }
            catch {
                return res.status(401).json({ message: "Invalid or expired refresh token" });
            }
        };
        this.forgotPassword = async (req, res) => {
            try {
                await this.authService.forgotPassword(req.body.email);
                return res.status(200).json({
                    message: "If an account exists for this email, password reset instructions have been sent.",
                });
            }
            catch {
                return res.status(200).json({
                    message: "If an account exists for this email, password reset instructions have been sent.",
                });
            }
        };
        this.me = async (req, res) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const user = await this.authService.getProfile(req.user);
                return res.status(200).json({ user });
            }
            catch {
                return res.status(401).json({ message: "Unauthorized" });
            }
        };
        this.patchMe = async (req, res) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const user = await this.authService.updateMyProfile(req.user, req.body);
                return res.status(200).json({ user });
            }
            catch {
                return res.status(400).json({ message: "Unable to update profile" });
            }
        };
        this.adminCapabilities = async (_req, res) => {
            return res
                .status(200)
                .json({ message: "You can manage users and content." });
        };
        this.contentWriteCapabilities = async (_req, res) => {
            return res.status(200).json({ message: "You can write content." });
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map