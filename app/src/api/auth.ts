import { AUTH_API_PATH } from '../constants/auth'
import type { UserRole } from '../models/domain/user.model'
import type { SessionUser } from '../store/slices/session-slice'
import { buildAuthClientContextBody } from '../utils'
import { apiRequest } from './core/client'

export type LoginBody = { email: string; password: string }
export type AuthTokens = { accessToken: string; refreshToken: string }

export type RegisterBody = {
  firstname: string
  lastname: string
  email: string
  password: string
  /** Omit or leave empty if the account is created with email only. */
  phone?: string
}

export type ForgotPasswordBody = { email: string }
export type ForgotPasswordResponse = { message: string }

type MeUserDto = {
  userId: string
  firstname: string
  lastname: string
  email: string
  phone: string | null
  location: string | null
  avatar_url: string | null
  role: UserRole
  permissions: string[]
}

export type UpdateMeBody = {
  firstname?: string
  lastname?: string
  avatar_url?: string | null
  phone?: string
  location?: string | null
}

export function mapMeUserToSessionUser(u: MeUserDto): SessionUser {
  return {
    id: u.userId,
    firstname: u.firstname,
    lastname: u.lastname,
    email: u.email,
    phone: u.phone ?? undefined,
    location: u.location,
    avatar_url: u.avatar_url,
    role: u.role,
    roles: [u.role],
    permissions: u.permissions,
  }
}

export async function login(body: LoginBody): Promise<AuthTokens> {
  return apiRequest<AuthTokens>(AUTH_API_PATH.LOGIN, {
    method: 'POST',
    json: { ...body, ...buildAuthClientContextBody() },
  })
}

export async function loginWithGoogleIdToken(idToken: string): Promise<AuthTokens> {
  return apiRequest<AuthTokens>(AUTH_API_PATH.SOCIAL_GOOGLE, {
    method: 'POST',
    json: { idToken, ...buildAuthClientContextBody() },
  })
}

export async function loginWithFacebookAccessToken(accessToken: string): Promise<AuthTokens> {
  return apiRequest<AuthTokens>(AUTH_API_PATH.SOCIAL_FACEBOOK, {
    method: 'POST',
    json: { accessToken, ...buildAuthClientContextBody() },
  })
}

export async function register(body: RegisterBody): Promise<AuthTokens> {
  const json: Record<string, string> = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
  }
  const ph = body.phone?.trim()
  if (ph) json.phone = ph
  return apiRequest<AuthTokens>(AUTH_API_PATH.REGISTER, {
    method: 'POST',
    json: { ...json, ...buildAuthClientContextBody() },
  })
}

export async function forgotPassword(body: ForgotPasswordBody): Promise<ForgotPasswordResponse> {
  return apiRequest<ForgotPasswordResponse>(AUTH_API_PATH.FORGOT_PASSWORD, {
    method: 'POST',
    json: body,
  })
}

export async function fetchSessionProfile(): Promise<SessionUser> {
  const res = await apiRequest<{ user: MeUserDto }>(AUTH_API_PATH.ME)
  return mapMeUserToSessionUser(res.user)
}

export async function updateProfile(body: UpdateMeBody): Promise<SessionUser> {
  const res = await apiRequest<{ user: MeUserDto }>(AUTH_API_PATH.ME, {
    method: 'PATCH',
    json: body,
  })
  return mapMeUserToSessionUser(res.user)
}
