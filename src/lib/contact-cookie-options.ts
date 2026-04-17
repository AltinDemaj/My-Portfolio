/**
 * Optional `CONTACT_COOKIE_DOMAIN` (e.g. `.example.com`) so verification cookies
 * are shared between apex and www when both hit the same app.
 */
export function contactCookieOptions(maxAge: number): {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
  domain?: string;
} {
  const domain = process.env.CONTACT_COOKIE_DOMAIN?.trim();
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
    ...(domain ? { domain } : {}),
  };
}
