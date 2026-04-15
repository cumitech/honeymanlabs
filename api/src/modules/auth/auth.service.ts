import bcrypt from "bcrypt";
import { ROLE_PERMISSIONS } from "../../common/constants/app-constants";
import { type AuthTokenPayload, signToken } from "../../common/utils/jwt";
import { AuthRepository, type RegisterData } from "./auth.repository";

export type LoginData = {
  email: string;
  password: string;
};

export class AuthService {
  constructor(private readonly repo: AuthRepository) { }

  async register(data: RegisterData): Promise<{ token: string }> {
    const { password, ...userData } = data
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.repo.createUser({
      ...userData,
      password_hash: passwordHash,
    });

    const token = signToken({
      userId: user.id,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    });

    return { token };
  }

  async login(data: LoginData): Promise<{ token: string }> {
    const user = await this.repo.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    });

    return { token };
  }

  async getProfile(auth: AuthTokenPayload) {
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

  async forgotPassword(email: string): Promise<void> {
    // Intentionally return success regardless of user existence to avoid email enumeration.
    await this.repo.findByEmail(email);
  }
}

