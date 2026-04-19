"use client";

import type { AuthProvider } from "@refinedev/core";

import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_API_PATH,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_TOKEN_LEGACY_KEY,
  PUBLIC_API_BASE_URL,
} from "@/constants";
import { type AuthUser } from "@/lib/auth/access-control";

function isPublicPath(pathname: string): boolean {
  return !pathname.startsWith("/dashboard");
}

async function postRefresh(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const response = await fetch(`${PUBLIC_API_BASE_URL}${AUTH_API_PATH.REFRESH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    throw new Error("Refresh failed");
  }
  return response.json() as Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}

async function getMe(token: string): Promise<AuthUser> {
  const response = await fetch(`${PUBLIC_API_BASE_URL}${AUTH_API_PATH.ME}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  const payload = await response.json();
  return payload.user as AuthUser;
}

async function getMeWithRefresh(): Promise<AuthUser> {
  let access = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  const refresh = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);

  if (!access && !refresh) {
    const legacy = localStorage.getItem(AUTH_TOKEN_LEGACY_KEY);
    if (legacy) {
      access = legacy;
    }
  }

  if (access) {
    try {
      return await getMe(access);
    } catch {}
  }

  if (!refresh) {
    throw new Error("Not authenticated");
  }

  const tokens = await postRefresh(refresh);
  localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.removeItem(AUTH_TOKEN_LEGACY_KEY);
  return await getMe(tokens.accessToken);
}

function clearStoredTokens() {
  localStorage.removeItem(AUTH_TOKEN_LEGACY_KEY);
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
}

export const authProvider: AuthProvider = {
  login: async (params: Record<string, unknown> | undefined) => {
    if (params?.providerName) {
      window.location.assign("/api/auth/social/auth0");
      return { success: true };
    }

    const email = String(params?.email ?? "");
    const password = String(params?.password ?? "");

    const deviceLabel =
      typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : undefined;

    const response = await fetch(`${PUBLIC_API_BASE_URL}${AUTH_API_PATH.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Kind": "web",
      },
      body: JSON.stringify({
        email,
        password,
        clientKind: "web" as const,
        ...(deviceLabel ? { deviceLabel } : {}),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: { name: "LoginError", message: "Invalid credentials" },
      };
    }

    const payload = await response.json();
    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.removeItem(AUTH_TOKEN_LEGACY_KEY);

    return {
      success: true,
      redirectTo: "/dashboard",
    };
  },
  register: async (params: Record<string, unknown> | undefined) => {
    if (params?.providerName) {
      window.location.assign("/api/auth/social/auth0");
      return { success: true };
    }

    const deviceLabel =
      typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : undefined;

    const response = await fetch(`${PUBLIC_API_BASE_URL}${AUTH_API_PATH.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Kind": "web",
      },
      body: JSON.stringify({
        ...params,
        clientKind: "web" as const,
        ...(deviceLabel ? { deviceLabel } : {}),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: { name: "RegisterError", message: "Unable to create account" },
      };
    }

    const payload = await response.json();
    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.removeItem(AUTH_TOKEN_LEGACY_KEY);

    return {
      success: true,
      redirectTo: "/dashboard",
    };
  },
  forgotPassword: async ({
    email,
  }: {
    email?: string;
  }) => {
    const response = await fetch(`${PUBLIC_API_BASE_URL}${AUTH_API_PATH.FORGOT_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: "Could not process password reset request",
        },
      };
    }

    return {
      success: true,
      successNotification: {
        message: "Password reset request received",
        description:
          "If an account exists for this email, password reset instructions have been sent.",
      },
    };
  },
  logout: async () => {
    clearStoredTokens();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async () => {
    return { error: undefined };
  },
  check: async () => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    if (isPublicPath(pathname)) {
      return { authenticated: true };
    }

    const access = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
    const refresh = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
    const legacy = localStorage.getItem(AUTH_TOKEN_LEGACY_KEY);
    if (!access && !refresh && !legacy) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      await getMeWithRefresh();
      return { authenticated: true };
    } catch {
      clearStoredTokens();
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    try {
      const user = await getMeWithRefresh();
      return user.permissions;
    } catch {
      return null;
    }
  },
  getIdentity: async () => {
    try {
      return await getMeWithRefresh();
    } catch {
      return null;
    }
  },
};
