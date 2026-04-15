"use client";

export const LANGUAGE_STORAGE_KEY = "honeyman-locale";
export const LANGUAGE_COOKIE_KEY = "honeyman-locale";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(value: string | null | undefined): value is AppLanguage {
  return !!value && SUPPORTED_LANGUAGES.includes(value as AppLanguage);
}

export function getLanguageFromClient(): AppLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const fromStorage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(fromStorage)) return fromStorage;

  const match = document.cookie.match(new RegExp(`(?:^|; )${LANGUAGE_COOKIE_KEY}=([^;]+)`));
  const fromCookie = match ? decodeURIComponent(match[1] ?? "") : null;
  if (isSupportedLanguage(fromCookie)) return fromCookie;

  return DEFAULT_LANGUAGE;
}

export function setLanguageOnClient(language: AppLanguage) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.cookie = `${LANGUAGE_COOKIE_KEY}=${encodeURIComponent(language)}; path=/; max-age=31536000; SameSite=Lax`;
  document.documentElement.lang = language;
  window.dispatchEvent(new CustomEvent("honeyman-locale-change", { detail: { locale: language } }));
}
