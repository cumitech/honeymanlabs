import { User } from "../../database/models/user.model";

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
  role?: string | undefined;
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
}

