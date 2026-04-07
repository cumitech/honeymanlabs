"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../common/utils/jwt");
class AuthService {
    repo;
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
        });
        return { token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map