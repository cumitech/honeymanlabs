"use client";

import type { AuthProvider } from "@refinedev/core";

import { type AuthUser } from "@/lib/auth/access-control";

const AUTH_TOKEN_KEY = "honeymanlabs:auth-token";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

function isPublicPath(pathname: string): boolean {
  // Only dashboard surfaces require authentication.
  return !pathname.startsWith("/dashboard");
}

async function getMe(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
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

export const authProvider: AuthProvider = {
  login: async (params: Record<string, unknown> | undefined) => {
    if (params?.providerName) {
      window.location.assign("/api/auth/social/auth0");
      return { success: true };
    }

    const email = String(params?.email ?? "");
    const password = String(params?.password ?? "");

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: { name: "LoginError", message: "Invalid credentials" },
      };
    }

    const payload = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, payload.token);

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

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return {
        success: false,
        error: { name: "RegisterError", message: "Unable to create account" },
      };
    }

    const payload = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, payload.token);

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
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
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
    localStorage.removeItem(AUTH_TOKEN_KEY);
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

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      await getMe(token);
      return { authenticated: true };
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    try {
      const user = await getMe(token);
      return user.permissions;
    } catch {
      return null;
    }
  },
  getIdentity: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    try {
      return await getMe(token);
    } catch {
      return null;
    }
  },
};
