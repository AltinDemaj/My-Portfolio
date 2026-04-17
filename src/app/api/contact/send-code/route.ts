import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactCookieOptions } from "@/lib/contact-cookie-options";
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

/** Extract bare email from `Name <addr@domain>` or `addr@domain`. */
function parseFromEmailAddress(from: string): string | null {
  const t = from.trim();
  const angle = t.match(/<([^>]+)>/);
  const raw = (angle ? angle[1] : t).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return null;
  return raw;
}

/** Resend-hosted @resend.dev senders stay in testing mode (only your account inbox). */
function isResendHostedSandboxSender(from: string): boolean {
  const addr = parseFromEmailAddress(from);
  return addr != null && addr.endsWith("@resend.dev");
}

function coalesceResendError(err: unknown): { message: string; name?: string } {
  if (!err || typeof err !== "object") {
    return { message: typeof err === "string" ? err : "Unknown error" };
  }
  const o = err as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name : undefined;
  if (typeof o.message === "string" && o.message.length > 0) {
    return { message: o.message, name };
  }
  const errors = o.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    const first = errors[0];
    if (first && typeof first === "object") {
      const fe = first as Record<string, unknown>;
      if (typeof fe.message === "string" && fe.message.length > 0) {
        return { message: fe.message, name };
      }
    }
  }
  return { message: "Email provider returned an error.", name };
}

/** Map Resend API errors to actionable copy (sandbox / domain issues are common). */
function resendSendUserMessage(error: { message?: string; name?: string }): {
  message: string;
  status: number;
} {
  const raw = (error.message ?? "").trim();
  const lower = raw.toLowerCase();
  const name = error.name ?? "";

  if (name === "invalid_region" || lower.includes("invalid_region")) {
    return {
      message:
        "Resend reported a region mismatch for this send. In the Resend dashboard, open your domain and confirm its region matches your account; if it persists, contact Resend support with the timestamp of this request.",
      status: 403,
    };
  }

  if (name === "invalid_from_address" || lower.includes("invalid from")) {
    return {
      message:
        "Resend rejected the sender address. Set RESEND_FROM_EMAIL to an address on a domain you have verified in the Resend dashboard.",
      status: 403,
    };
  }

  if (
    lower.includes("only send testing emails") ||
    lower.includes("verify a domain") ||
    (lower.includes("testing") && lower.includes("own email"))
  ) {
    return {
      message:
        "Resend is in testing mode: verification codes can only be sent to your own Resend account email until you verify a custom domain. Add a domain at resend.com/domains, complete DNS verification, then set RESEND_FROM_EMAIL to something like noreply@yourdomain.com.",
      status: 403,
    };
  }

  if (lower.includes("domain") && lower.includes("not verified")) {
    return {
      message:
        "Your sending domain is not verified in Resend yet. Finish verification in the Resend dashboard, then try again.",
      status: 403,
    };
  }

  return {
    message: "Could not send the verification email. Try again later.",
    status: 502,
  };
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

  if (isResendHostedSandboxSender(from)) {
    return NextResponse.json(
      {
        error:
          "RESEND_FROM_EMAIL still uses a Resend test address (@resend.dev), so codes can only reach your own Resend login email. Set RESEND_FROM_EMAIL to an address on your verified domain (for example Portfolio <hello@yourdomain.com>) in your host’s environment variables, redeploy, then try again.",
      },
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
    const normalized = coalesceResendError(error);
    const { message, status } = resendSendUserMessage(normalized);
    return NextResponse.json({ error: message }, { status });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_PENDING, token, contactCookieOptions(PENDING_MAX_AGE_S));

  return res;
}
