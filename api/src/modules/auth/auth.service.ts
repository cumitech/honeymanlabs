import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { ROLE_PERMISSIONS, USER_ROLES } from "../../common/constants/app-constants";
import {
  type AuthTokenPayload,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt";
import type { User } from "../../database/models/user.model";
import type { RegisterInput, UpdateMeInput } from "./auth.schema";
import { AuthRepository } from "./auth.repository";
import type { SignInAuditFields } from "./sign-in-audit";

export type AuthTokens = { accessToken: string; refreshToken: string };

export type LoginData = {
  email: string;
  password: string;
};

export class AuthService {
  constructor(private readonly repo: AuthRepository) {}

  private issueTokens(user: { id: string; role: USER_ROLES }): AuthTokens {
    const accessToken = signAccessToken({
      userId: user.id,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    });
    const refreshToken = signRefreshToken({ userId: user.id });
    return { accessToken, refreshToken };
  }

  private async finalizeAuth(
    user: User,
    method: "password" | "google" | "facebook" | "register",
    audit: SignInAuditFields,
  ): Promise<AuthTokens> {
    await this.repo.recordSignIn(user.id, {
      method,
      clientKind: audit.clientKind,
      deviceLabel: audit.deviceLabel,
      userAgent: audit.userAgent,
      ipAddress: audit.ipAddress,
    });
    return this.issueTokens(user);
  }

  async register(data: RegisterInput, audit: SignInAuditFields): Promise<AuthTokens> {
    const { password, clientKind: _ck, deviceLabel: _dl, ...rest } = data;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.repo.createUser({
      ...rest,
      password_hash: passwordHash,
    });
    return await this.finalizeAuth(user, "register", audit);
  }

  async login(data: LoginData, audit: SignInAuditFields): Promise<AuthTokens> {
    const user = await this.repo.findByEmail(data.email);
    if (!user || !user.password_hash) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return await this.finalizeAuth(user, "password", audit);
  }

  private googleAudiences(): string[] {
    const raw = process.env.GOOGLE_OAUTH_CLIENT_IDS ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async loginWithGoogleIdToken(idToken: string, audit: SignInAuditFields): Promise<AuthTokens> {
    const audiences = this.googleAudiences();
    if (audiences.length === 0) {
      throw new Error("Google sign-in is not configured");
    }
    const client = new OAuth2Client();
    let ticket;
    try {
      ticket = await client.verifyIdToken({ idToken, audience: audiences });
    } catch {
      throw new Error("Invalid Google credential");
    }
    const payload = ticket.getPayload();
    if (!payload?.sub) {
      throw new Error("Invalid Google credential");
    }
    if (!payload.email || payload.email_verified !== true) {
      throw new Error("Google account must have a verified email");
    }
    const sub = payload.sub;
    const email = payload.email.trim().toLowerCase();
    const firstname =
      payload.given_name?.trim() ||
      payload.name?.split(/\s+/)[0]?.trim() ||
      "Member";
    const lastname =
      payload.family_name?.trim() ||
      payload.name?.split(/\s+/).slice(1).join(" ").trim() ||
      "User";
    const avatar = typeof payload.picture === "string" ? payload.picture : null;

    let user = await this.repo.findByGoogleSub(sub);
    if (user) {
      return await this.finalizeAuth(user, "google", audit);
    }
    user = await this.repo.findByEmail(email);
    if (user) {
      if (user.google_sub && user.google_sub !== sub) {
        throw new Error("This email is already linked to another Google account");
      }
      await this.repo.updateUser(user.id, {
        google_sub: sub,
        ...(user.avatar_url ? {} : avatar ? { avatar_url: avatar } : {}),
      });
      const reloaded = await this.repo.findById(user.id);
      if (!reloaded) throw new Error("User not found");
      return await this.finalizeAuth(reloaded, "google", audit);
    }

    const created = await this.repo.createOAuthUser({
      firstname,
      lastname,
      email,
      password_hash: null,
      phone: null,
      avatar_url: avatar,
      google_sub: sub,
      facebook_id: null,
    });
    return await this.finalizeAuth(created, "google", audit);
  }

  async loginWithFacebookAccessToken(
    accessToken: string,
    audit: SignInAuditFields,
  ): Promise<AuthTokens> {
    const url = new URL("https://graph.facebook.com/v18.0/me");
    url.searchParams.set(
      "fields",
      "id,email,first_name,last_name,name,picture.type(large)",
    );
    url.searchParams.set("access_token", accessToken);
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error("Invalid Facebook credential");
    }
    const me = (await res.json()) as {
      id?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
      name?: string;
      picture?: { data?: { url?: string } };
    };
    if (!me.id) {
      throw new Error("Invalid Facebook credential");
    }
    const fbId = me.id;
    const emailNorm = me.email?.trim().toLowerCase();
    const stableEmail = emailNorm ?? `fb.${fbId}.oauth@honeymanlabs.internal`.toLowerCase();
    const firstname =
      me.first_name?.trim() || me.name?.split(/\s+/)[0]?.trim() || "Member";
    const lastname =
      me.last_name?.trim() ||
      me.name?.split(/\s+/).slice(1).join(" ").trim() ||
      "User";
    const avatar = me.picture?.data?.url ?? null;

    let user = await this.repo.findByFacebookId(fbId);
    if (user) {
      return await this.finalizeAuth(user, "facebook", audit);
    }
    if (emailNorm) {
      user = await this.repo.findByEmail(emailNorm);
      if (user) {
        if (user.facebook_id && user.facebook_id !== fbId) {
          throw new Error("This email is already linked to another Facebook account");
        }
        await this.repo.updateUser(user.id, {
          facebook_id: fbId,
          ...(user.avatar_url ? {} : avatar ? { avatar_url: avatar } : {}),
        });
        const reloaded = await this.repo.findById(user.id);
        if (!reloaded) throw new Error("User not found");
        return await this.finalizeAuth(reloaded, "facebook", audit);
      }
    }

    if (!emailNorm) {
      const existing = await this.repo.findByEmail(stableEmail);
      if (existing) {
        return await this.finalizeAuth(existing, "facebook", audit);
      }
    }

    const created = await this.repo.createOAuthUser({
      firstname,
      lastname,
      email: emailNorm ?? stableEmail,
      password_hash: null,
      phone: null,
      avatar_url: avatar,
      google_sub: null,
      facebook_id: fbId,
    });
    return await this.finalizeAuth(created, "facebook", audit);
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
    await this.repo.findByEmail(email);
  }
}
