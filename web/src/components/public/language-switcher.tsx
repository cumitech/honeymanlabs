"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "honeyman-locale";

const locales = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
] as const;

export function LanguageSwitcher() {
  const [locale, setLocale] = useState<string>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    const initial = stored && locales.some((l) => l.value === stored)
      ? stored
      : "en";
    setLocale(initial);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
    }
  }, []);

  const handleChange = (value: string) => {
    setLocale(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = value;
    }
    window.dispatchEvent(
      new CustomEvent("honeyman-locale-change", { detail: { locale: value } })
    );
  };

  if (!mounted) {
    return (
      <div
        className="h-9 w-[100px] shrink-0 rounded-md border border-input/60 bg-transparent"
        aria-hidden
      />
    );
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        className="h-9 w-[min(100%,7.5rem)] border-input/60 bg-transparent text-xs shadow-none sm:w-28"
        aria-label="Language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((l) => (
          <SelectItem key={l.value} value={l.value} className="text-sm">
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
