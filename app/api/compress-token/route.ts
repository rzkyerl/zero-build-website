import { NextResponse } from "next/server";

/**
 * Returns the ApyHub token so the client can upload directly to ApyHub.
 * This bypasses Vercel's 4.5MB serverless function body size limit.
 *
 * Security note: the token is exposed to the browser, but ApyHub tokens
 * only grant access to compression APIs — no user data or payment info.
 * Rate limiting and quota are managed by ApyHub on the token level.
 */
export async function GET() {
  const token = process.env.APYHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Compression service not configured." },
      { status: 503 }
    );
  }
  return NextResponse.json({ token });
}
