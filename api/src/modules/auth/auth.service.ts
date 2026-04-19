import bcrypt from "bcrypt";
import { ROLE_PERMISSIONS, USER_ROLES } from "../../common/constants/app-constants";
import {
  type AuthTokenPayload,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt";
import type { UpdateMeInput } from "./auth.schema";
import { AuthRepository, type RegisterData } from "./auth.repository";

export type AuthTokens = { accessToken: string; refreshToken: string };

export type LoginData = {
  email: string;
  password: string;
};

export class AuthService {
  constructor(private readonly repo: AuthRepository) { }

  private issueTokens(user: { id: string; role: USER_ROLES }): AuthTokens {
    const accessToken = signAccessToken({
      userId: user.id,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    });
    const refreshToken = signRefreshToken({ userId: user.id });
    return { accessToken, refreshToken };
  }

  async register(data: RegisterData): Promise<AuthTokens> {
    const { password, ...userData } = data
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.repo.createUser({
      ...userData,
      password_hash: passwordHash,
    });

    return this.issueTokens(user);
  }

  async login(data: LoginData): Promise<AuthTokens> {
    const user = await this.repo.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return this.issueTokens(user);
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    let payload: ReturnType<typeof verifyRefreshToken>;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new Error("Invalid refresh token");
    }
    const user = await this.repo.findById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.issueTokens(user);
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
      phone: user.phone,
      location: user.location,
      avatar_url: user.avatar_url,
      role: user.role,
      permissions: auth.permissions,
    };
  }

  async updateMyProfile(auth: AuthTokenPayload, data: UpdateMeInput) {
    const patch: Partial<{
      firstname: string;
      lastname: string;
      avatar_url: string | null;
      phone: string;
      location: string | null;
    }> = {};
    if (data.firstname !== undefined) patch.firstname = data.firstname;
    if (data.lastname !== undefined) patch.lastname = data.lastname;
    if (data.avatar_url !== undefined) patch.avatar_url = data.avatar_url;
    if (data.phone !== undefined) patch.phone = data.phone;
    if (data.location !== undefined) patch.location = data.location;

    const updated = await this.repo.updateUser(auth.userId, patch);
    if (!updated) {
      throw new Error("User not found");
    }
    return this.getProfile(auth);
  }

  async forgotPassword(email: string): Promise<void> {
    // Intentionally return success regardless of user existence to avoid email enumeration.
    await this.repo.findByEmail(email);
  }
}

