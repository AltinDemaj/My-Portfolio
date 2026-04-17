import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createPendingToken,
  generateSixDigitCode,
} from "@/lib/contact-tokens";

export const runtime = "nodejs";

const COOKIE_PENDING = "contact_pending";
const PENDING_MAX_AGE_S = 15 * 60;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const secret = process.env.CONTACT_VERIFY_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.json(
      { error: "Contact verification is not configured (missing CONTACT_VERIFY_SECRET)." },
      { status: 503 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL)." },
      { status: 503 },
    );
  }

  const code = generateSixDigitCode();
  const token = createPendingToken(secret, email, code, PENDING_MAX_AGE_S * 1000);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Your portfolio contact verification code",
    text: `Your verification code is: ${code}\n\nIt expires in ${PENDING_MAX_AGE_S / 60} minutes. If you did not request this, you can ignore this email.`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Could not send the verification email. Try again later." },
      { status: 502 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_PENDING, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PENDING_MAX_AGE_S,
  });

  return res;
}
