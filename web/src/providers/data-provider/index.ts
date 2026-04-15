"use client";

import type { DataProvider } from "@refinedev/core";
import dataProviderSimpleRest from "@refinedev/simple-rest";
import { getLanguageFromClient } from "@/lib/i18n/language";

const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const AUTH_TOKEN_KEY = "honeymanlabs:auth-token";

const appProvider = dataProviderSimpleRest(APP_API_URL);

function withAuthMeta<T extends { meta?: unknown }>(params: T): T {
  const token =
    typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
  const language = getLanguageFromClient();
  const meta = (params.meta ?? {}) as Record<string, unknown>;
  const headers = (meta.headers ?? {}) as Record<string, string>;

  return {
    ...params,
    meta: {
      ...meta,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "X-Language": language,
      },
    },
  };
}

function withLanguagePayload<T extends { variables?: unknown }>(params: T): T {
  const language = getLanguageFromClient();
  const variables =
    params.variables && typeof params.variables === "object"
      ? (params.variables as Record<string, unknown>)
      : {};

  return {
    ...params,
    variables: {
      ...variables,
      lang: language,
    } as T["variables"],
  };
}

export const dataProvider: DataProvider = {
  getApiUrl: () => APP_API_URL,
  getList: (params) => appProvider.getList(withAuthMeta(params)),
  getMany: (params) => appProvider.getMany(withAuthMeta(params)),
  getOne: (params) => appProvider.getOne(withAuthMeta(params)),
  create: (params) => appProvider.create(withAuthMeta(withLanguagePayload(params))),
  createMany: (_params) => Promise.reject(new Error("createMany is not supported")),
  update: (params) => appProvider.update(withAuthMeta(withLanguagePayload(params))),
  updateMany: (_params) => Promise.reject(new Error("updateMany is not supported")),
  deleteOne: (params) => appProvider.deleteOne(withAuthMeta(params)),
  deleteMany: (_params) => Promise.reject(new Error("deleteMany is not supported")),
  custom: (params) =>
    appProvider.custom
      ? appProvider.custom(withAuthMeta(params))
      : Promise.reject(new Error("custom is not supported")),
};
