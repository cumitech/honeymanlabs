import type { Request } from "express";

export type SignInAuditFields = {
  clientKind: "web" | "ios" | "android" | null;
  deviceLabel: string | null;
  userAgent: string | null;
  ipAddress: string | null;
};

type BodyWithClient = {
  clientKind?: unknown;
  deviceLabel?: unknown;
};

function normalizeClientKind(v: unknown): "web" | "ios" | "android" | null {
  if (v !== "web" && v !== "ios" && v !== "android") return null;
  return v;
}

/** Prefer JSON body; optional header `X-Client-Kind` for web or proxies. */
export function signInAuditFromRequest(req: Request, body: BodyWithClient): SignInAuditFields {
  const headerRaw = req.headers["x-client-kind"];
  const headerKind =
    typeof headerRaw === "string" ? headerRaw.trim().toLowerCase() : undefined;
  const clientKind =
    normalizeClientKind(body.clientKind) ?? normalizeClientKind(headerKind);

  const xf = req.headers["x-forwarded-for"];
  let ipAddress: string | null = null;
  if (typeof xf === "string" && xf.length > 0) {
    ipAddress = xf.split(",")[0]?.trim().slice(0, 64) || null;
  } else if (req.socket?.remoteAddress) {
    ipAddress = String(req.socket.remoteAddress).slice(0, 64);
  }

  const userAgent =
    typeof req.headers["user-agent"] === "string"
      ? req.headers["user-agent"].slice(0, 512)
      : null;

  const deviceLabel =
    typeof body.deviceLabel === "string" && body.deviceLabel.trim().length > 0
      ? body.deviceLabel.trim().slice(0, 255)
      : null;

  return { clientKind, deviceLabel, userAgent, ipAddress };
}
