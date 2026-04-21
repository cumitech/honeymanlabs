export type AuthApiPathKey =
  | 'LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'ME'
  | 'REFRESH'
  | 'SOCIAL_GOOGLE'
  | 'SOCIAL_FACEBOOK'

export const AUTH_API_PATH: Record<AuthApiPathKey, string> = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  ME: '/auth/me',
  REFRESH: '/auth/refresh',
  SOCIAL_GOOGLE: '/auth/social/google',
  SOCIAL_FACEBOOK: '/auth/social/facebook',
}
