"use client";

import type { DataProvider } from "@refinedev/core";
import dataProviderSimpleRest from "@refinedev/simple-rest";
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_TOKEN_LEGACY_KEY,
  PUBLIC_API_BASE_URL,
} from "@/constants";
import { getLanguageFromClient } from "@/lib/i18n/language";

const appProvider = dataProviderSimpleRest(PUBLIC_API_BASE_URL);

function withAuthMeta<T extends { meta?: unknown }>(params: T): T {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(AUTH_ACCESS_TOKEN_KEY) ??
        localStorage.getItem(AUTH_TOKEN_LEGACY_KEY)
      : null;
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
  getApiUrl: () => PUBLIC_API_BASE_URL,
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
