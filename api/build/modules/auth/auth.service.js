"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_contants_1 = require("../../common/constants/app-contants");
const jwt_1 = require("../../common/utils/jwt");
class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    async register(data) {
        const { password, ...userData } = data;
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const user = await this.repo.createUser({
            ...userData,
            password_hash: passwordHash,
        });
        const token = (0, jwt_1.signToken)({
            userId: user.id,
            role: user.role,
            permissions: app_contants_1.ROLE_PERMISSIONS[user.role],
        });
        return { token };
    }
    async login(data) {
        const user = await this.repo.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt_1.default.compare(data.password, user.password_hash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }
        const token = (0, jwt_1.signToken)({
            userId: user.id,
            role: user.role,
            permissions: app_contants_1.ROLE_PERMISSIONS[user.role],
        });
        return { token };
    }
    async getProfile(auth) {
        const user = await this.repo.findById(auth.userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            avatar_url: user.avatar_url,
            role: user.role,
            permissions: auth.permissions,
        };
    }
    async forgotPassword(email) {
        // Intentionally return success regardless of user existence to avoid email enumeration.
        await this.repo.findByEmail(email);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map