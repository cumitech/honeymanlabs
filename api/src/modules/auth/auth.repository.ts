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

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async createUser(data: CreateUserData): Promise<User> {
    return User.create(data);
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async updateUser(
    id: string,
    fields: Partial<
      Pick<User, "firstname" | "lastname" | "avatar_url" | "phone" | "location">
    >,
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(fields);
    return user.reload();
  }
}

