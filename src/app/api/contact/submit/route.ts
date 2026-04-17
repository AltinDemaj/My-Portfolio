import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseVerifiedToken } from "@/lib/contact-tokens";

export const runtime = "nodejs";

const COOKIE_VERIFIED = "contact_verified";

const FORMSPREE_DEFAULT = "xjgjgjdq";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: Request) {
  const secret = process.env.CONTACT_VERIFY_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const MIN_MESSAGE = 2;
  if (!message || message.length < MIN_MESSAGE) {
    return NextResponse.json(
      { error: `Message must be at least ${MIN_MESSAGE} characters.` },
      { status: 400 },
    );
  }
  if (message.length > 10000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const jar = await cookies();
  const verifiedRaw = jar.get(COOKIE_VERIFIED)?.value;
  if (!verifiedRaw) {
    return NextResponse.json(
      { error: "Verify your email first using the code we sent you." },
      { status: 403 },
    );
  }

  const verified = parseVerifiedToken(secret, verifiedRaw);
  if (!verified) {
    const res = NextResponse.json(
      { error: "Verification expired. Request a new code and verify again." },
      { status: 403 },
    );
    res.cookies.set(COOKIE_VERIFIED, "", { path: "/", maxAge: 0 });
    return res;
  }

  if (email.toLowerCase() !== verified.email) {
    return NextResponse.json(
      { error: "Use the same email address you verified." },
      { status: 403 },
    );
  }

  const formId = process.env.FORMSPREE_FORM_ID ?? FORMSPREE_DEFAULT;
  const fsRes = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _replyto: email,
      _subject: `Portfolio contact from ${name}`,
    }),
  });

  if (!fsRes.ok) {
    const text = await fsRes.text().catch(() => "");
    console.error("Formspree error:", fsRes.status, text);
    return NextResponse.json(
      { error: "Could not deliver your message. Try again later." },
      { status: 502 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_VERIFIED, "", { path: "/", maxAge: 0 });
  return res;
}
