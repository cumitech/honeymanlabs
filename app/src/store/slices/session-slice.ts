import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sessionClaimsFromAccessToken } from '../../api/core/token'
import type { UserRole } from '../../models/domain/user.model'

export type SessionUser = {
  id: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  location?: string | null
  avatar_url?: string | null
  role: UserRole
  roles: UserRole[]
  permissions: string[]
}

type SessionState = {
  accessToken: string | null
  user: SessionUser | null
}

const initialState: SessionState = {
  accessToken: null,
  user: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    applyAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
      const claims = sessionClaimsFromAccessToken(action.payload.accessToken)
      if (!claims) return
      const prev = state.user
      state.user = {
        id: claims.id,
        role: claims.role,
        roles: claims.roles,
        permissions: claims.permissions,
        firstname: prev?.firstname,
        lastname: prev?.lastname,
        email: prev?.email,
        phone: prev?.phone,
        location: prev?.location,
        avatar_url: prev?.avatar_url ?? null,
      }
    },
    setUserProfile: (state, action: PayloadAction<SessionUser>) => {
      state.user = action.payload
    },
    clearCredentials: state => {
      state.accessToken = null
      state.user = null
    },
  },
})

export const { applyAccessToken, setUserProfile, clearCredentials } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
