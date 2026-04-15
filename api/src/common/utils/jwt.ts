import jwt from "jsonwebtoken"
import { PERMISSIONS, USER_ROLES } from "../constants/app-constants";

export type AuthTokenPayload = {
    userId: string;
    role: USER_ROLES;
    permissions: PERMISSIONS[];
}

export const signToken = (payload: AuthTokenPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload
}