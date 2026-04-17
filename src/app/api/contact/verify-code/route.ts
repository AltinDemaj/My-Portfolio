import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  codeMatchesPending,
  createVerifiedToken,
  parsePendingToken,
} from "@/lib/contact-tokens";

export const runtime = "nodejs";

const COOKIE_PENDING = "contact_pending";
const COOKIE_VERIFIED = "contact_verified";
const VERIFIED_MAX_AGE_S = 10 * 60;

export async function POST(req: Request) {
  const secret = process.env.CONTACT_VERIFY_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code : "";
  if (!/^\d{6}$/.test(code.trim())) {
    return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
  }

  const jar = await cookies();
  const pendingRaw = jar.get(COOKIE_PENDING)?.value;
  if (!pendingRaw) {
    return NextResponse.json(
      { error: "No pending verification. Request a new code." },
      { status: 400 },
    );
  }

  const pending = parsePendingToken(secret, pendingRaw);
  if (!pending) {
    const res = NextResponse.json({ error: "Code expired or invalid session. Request a new code." }, { status: 400 });
    res.cookies.set(COOKIE_PENDING, "", { path: "/", maxAge: 0 });
    return res;
  }

  if (!codeMatchesPending(secret, pending, code)) {
    return NextResponse.json({ error: "Incorrect code. Try again." }, { status: 400 });
  }

  const verifiedToken = createVerifiedToken(secret, pending.email, VERIFIED_MAX_AGE_S * 1000);

  const res = NextResponse.json({ ok: true, email: pending.email });
  res.cookies.set(COOKIE_PENDING, "", { path: "/", maxAge: 0 });
  res.cookies.set(COOKIE_VERIFIED, verifiedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: VERIFIED_MAX_AGE_S,
  });

  return res;
}
