import jwt from "jsonwebtoken";
import { JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from "../constants/auth-tokens";
import { PERMISSIONS, USER_ROLES } from "../constants/app-constants";

export type AuthTokenPayload = {
  userId: string;
  role: USER_ROLES;
  permissions: PERMISSIONS[];
};

export type RefreshTokenPayload = {
  userId: string;
};

export const signAccessToken = (payload: AuthTokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
};

export const signRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;
};
