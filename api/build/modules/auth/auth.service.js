"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_constants_1 = require("../../common/constants/app-constants");
const jwt_1 = require("../../common/utils/jwt");
class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    issueTokens(user) {
        const accessToken = (0, jwt_1.signAccessToken)({
            userId: user.id,
            role: user.role,
            permissions: app_constants_1.ROLE_PERMISSIONS[user.role],
        });
        const refreshToken = (0, jwt_1.signRefreshToken)({ userId: user.id });
        return { accessToken, refreshToken };
    }
    async register(data) {
        const { password, ...userData } = data;
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const user = await this.repo.createUser({
            ...userData,
            password_hash: passwordHash,
        });
        return this.issueTokens(user);
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
        return this.issueTokens(user);
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        }
        catch {
            throw new Error("Invalid refresh token");
        }
        const user = await this.repo.findById(payload.userId);
        if (!user) {
            throw new Error("User not found");
        }
        return this.issueTokens(user);
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
            phone: user.phone,
            location: user.location,
            avatar_url: user.avatar_url,
            role: user.role,
            permissions: auth.permissions,
        };
    }
    async updateMyProfile(auth, data) {
        const patch = {};
        if (data.firstname !== undefined)
            patch.firstname = data.firstname;
        if (data.lastname !== undefined)
            patch.lastname = data.lastname;
        if (data.avatar_url !== undefined)
            patch.avatar_url = data.avatar_url;
        if (data.phone !== undefined)
            patch.phone = data.phone;
        if (data.location !== undefined)
            patch.location = data.location;
        const updated = await this.repo.updateUser(auth.userId, patch);
        if (!updated) {
            throw new Error("User not found");
        }
        return this.getProfile(auth);
    }
    async forgotPassword(email) {
        // Intentionally return success regardless of user existence to avoid email enumeration.
        await this.repo.findByEmail(email);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map