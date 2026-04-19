export const DEFAULT_PUBLIC_API_BASE_URL = "http://localhost:5000/api";

export const PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_PUBLIC_API_BASE_URL;
