import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?social=error", request.url));
  }

  // Social callback endpoint exists so redirect_uri always resolves in-app.
  // Full token exchange/session creation can be implemented here next.
  return NextResponse.redirect(new URL("/login?social=connected", request.url));
}
