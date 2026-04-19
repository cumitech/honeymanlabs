import { User } from "../../database/models/user.model";
import { USER_ROLES } from "../../common/constants/app-constants";

/**
 * Registration payload — field names match `User` model columns.
 * `password` is plaintext here; persist as `password_hash` via `CreateUserData`.
 */
export type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  /** Optional on signup; defaults to `USER_ROLES.CUSTOMER` on the model if omitted */
  role?: USER_ROLES | undefined;
  location?: string | undefined;
  avatar_url?: string | undefined;
};

export type CreateUserData = Omit<RegisterData, "password"> & {
  password_hash: string;
};

export type CreateOAuthUserData = {
  firstname: string;
  lastname: string;
  email: string;
  password_hash: null;
  phone: string | null;
  avatar_url: string | null;
  google_sub: string | null;
  facebook_id: string | null;
};

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async findByGoogleSub(googleSub: string): Promise<User | null> {
    return User.findOne({ where: { google_sub: googleSub } });
  }

  async findByFacebookId(facebookId: string): Promise<User | null> {
    return User.findOne({ where: { facebook_id: facebookId } });
  }

  async createUser(data: CreateUserData): Promise<User> {
    return User.create(data);
  }

  async createOAuthUser(data: CreateOAuthUserData): Promise<User> {
    return User.create({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password_hash: null,
      phone: data.phone,
      avatar_url: data.avatar_url,
      google_sub: data.google_sub,
      facebook_id: data.facebook_id,
    });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async updateUser(
    id: string,
    fields: Partial<
      Pick<User, "firstname" | "lastname" | "avatar_url" | "phone" | "location" | "google_sub" | "facebook_id">
    >,
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(fields);
    return user.reload();
  }

  async recordSignIn(
    userId: string,
    row: {
      method: string;
      clientKind: string | null;
      deviceLabel: string | null;
      userAgent: string | null;
      ipAddress: string | null;
    },
  ): Promise<void> {
    const user = await User.findByPk(userId);
    if (!user) return;
    await user.increment("sign_in_count");
    await user.update({
      last_sign_in_at: new Date(),
      last_sign_in_method: row.method,
      last_sign_in_client: row.clientKind,
      last_sign_in_device_label: row.deviceLabel,
      last_sign_in_user_agent: row.userAgent,
      last_sign_in_ip: row.ipAddress,
    });
  }
}

