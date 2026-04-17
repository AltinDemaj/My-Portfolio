import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

const HMAC = "sha256";

export type PendingPayload = {
  email: string;
  codeHash: string;
  exp: number;
};

export type VerifiedPayload = {
  email: string;
  exp: number;
};

export function hashVerificationCode(secret: string, email: string, code: string): string {
  const e = email.toLowerCase().trim();
  return createHmac(HMAC, secret).update(`${e}:${code.trim()}`).digest("hex");
}

export function generateSixDigitCode(): string {
  return String(randomInt(100000, 999999));
}

function signPayload(payload: string, secret: string): string {
  const body = Buffer.from(payload, "utf8").toString("base64url");
  const sig = createHmac(HMAC, secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyAndReadPayload(token: string, secret: string): string | null {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac(HMAC, secret).update(body).digest("base64url");
  const a = Buffer.from(sig, "base64url");
  const b = Buffer.from(expected, "base64url");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return Buffer.from(body, "base64url").toString("utf8");
}

export function createPendingToken(
  secret: string,
  email: string,
  code: string,
  ttlMs: number,
): string {
  const exp = Date.now() + ttlMs;
  const payload: PendingPayload = {
    email: email.toLowerCase().trim(),
    codeHash: hashVerificationCode(secret, email, code),
    exp,
  };
  return signPayload(JSON.stringify(payload), secret);
}

export function parsePendingToken(secret: string, token: string): PendingPayload | null {
  try {
    const raw = verifyAndReadPayload(token, secret);
    if (!raw) return null;
    const p = JSON.parse(raw) as PendingPayload;
    if (!p.email || !p.codeHash || typeof p.exp !== "number") return null;
    if (Date.now() > p.exp) return null;
    return p;
  } catch {
    return null;
  }
}

export function createVerifiedToken(secret: string, email: string, ttlMs: number): string {
  const exp = Date.now() + ttlMs;
  const payload: VerifiedPayload = {
    email: email.toLowerCase().trim(),
    exp,
  };
  return signPayload(JSON.stringify(payload), secret);
}

export function parseVerifiedToken(secret: string, token: string): VerifiedPayload | null {
  try {
    const raw = verifyAndReadPayload(token, secret);
    if (!raw) return null;
    const p = JSON.parse(raw) as VerifiedPayload;
    if (!p.email || typeof p.exp !== "number") return null;
    if (Date.now() > p.exp) return null;
    return p;
  } catch {
    return null;
  }
}

export function codeMatchesPending(
  secret: string,
  pending: PendingPayload,
  code: string,
): boolean {
  const h = hashVerificationCode(secret, pending.email, code);
  try {
    const a = Buffer.from(h, "hex");
    const b = Buffer.from(pending.codeHash, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
