import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  if (!["auth0", "google", "github"].includes(provider)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const issuer = process.env.AUTH0_ISSUER_BASE_URL;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const callbackPath = process.env.AUTH0_CALLBACK_PATH ?? "/api/auth/callback";
  const callbackUrl = new URL(callbackPath, request.nextUrl.origin).toString();
  const scope = process.env.AUTH0_SCOPE ?? "openid profile email";

  if (!issuer || !clientId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const authorizeUrl = new URL("/authorize", issuer);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("redirect_uri", callbackUrl);

  return NextResponse.redirect(authorizeUrl);
}
