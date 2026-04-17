"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  FileText,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { siteOwner, socialLinks } from "@/data/portfolio";

const socialIconMap = { Github, Linkedin, Instagram };

/** Short messages are allowed once email is verified; keeps “Send” usable for quick notes. */
const MIN_MESSAGE_LENGTH = 2;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  const [sendError, setSendError] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [sendingCode, setSendingCode] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!verifiedEmail) return;
    if (email.trim().toLowerCase() !== verifiedEmail.toLowerCase()) {
      setVerifiedEmail(null);
      setCodeSent(false);
      setCode("");
      setVerifyError(null);
    }
  }, [email, verifiedEmail]);

  const sendCode = useCallback(async () => {
    setSendError(null);
    if (!isValidEmail(email)) {
      setSendError("Enter a valid email address first.");
      return;
    }
    setSendingCode(true);
    try {
      const res = await fetch("/api/contact/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        resendCode?: string;
      };
      if (!res.ok) {
        const base = data.error ?? "Could not send the code.";
        const hint = data.resendCode ? `\n(Resend: ${data.resendCode})` : "";
        setSendError(base + hint);
        return;
      }
      setCodeSent(true);
      setCode("");
      setVerifyError(null);
    } catch {
      setSendError("Network error. Try again.");
    } finally {
      setSendingCode(false);
    }
  }, [email]);

  const verifyCode = useCallback(async () => {
    setVerifyError(null);
    if (!/^\d{6}$/.test(code.trim())) {
      setVerifyError("Enter the 6-digit code from your email.");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("/api/contact/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; email?: string };
      if (!res.ok) {
        setVerifyError(data.error ?? "Verification failed.");
        return;
      }
      if (data.email) setVerifiedEmail(data.email.toLowerCase());
      setVerifyError(null);
    } catch {
      setVerifyError("Network error. Try again.");
    } finally {
      setVerifying(false);
    }
  }, [code]);

  const submitMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      if (!verifiedEmail) {
        setSubmitError("Verify your email with the code we send you before submitting.");
        return;
      }
      if (email.trim().toLowerCase() !== verifiedEmail) {
        setSubmitError("Use the same email you verified.");
        return;
      }
      if (!name.trim()) {
        setSubmitError("Please enter your name.");
        return;
      }
      if (message.trim().length < MIN_MESSAGE_LENGTH) {
        setSubmitError(`Message must be at least ${MIN_MESSAGE_LENGTH} characters.`);
        return;
      }
      setSubmitting(true);
      try {
        const res = await fetch("/api/contact/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          setSubmitError(data.error ?? "Could not send your message.");
          return;
        }
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setCode("");
        setCodeSent(false);
        setVerifiedEmail(null);
      } catch {
        setSubmitError("Network error. Try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [verifiedEmail, email, name, message],
  );

  return (
    <section
      id="contact"
      className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-zinc-500 leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Send a
              message or reach out via email, phone, or socials.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${siteOwner.email}`}
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0" />
                <span>{siteOwner.email}</span>
              </a>
              <a
                href={`tel:${siteOwner.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>{siteOwner.phone}</span>
              </a>
              <p className="flex items-center gap-3 text-zinc-500">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>{siteOwner.location}</span>
              </p>
              <div className="flex gap-4 pt-2">
                {socialLinks.map(({ label, href, icon }) => {
                  const Icon = socialIconMap[icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              <div className="pt-4">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50"
                >
                  View Resume
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-10">
                <p className="text-center text-lg font-medium text-white">
                  Thanks for your message — I&apos;ll be in touch!
                </p>
              </div>
            ) : (
              <form
                onSubmit={submitMessage}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 md:p-8"
              >
                <p className="mb-4 flex items-start gap-2 rounded-lg border border-zinc-700/80 bg-zinc-950/50 px-3 py-2.5 text-sm text-zinc-400">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                  <span>
                    To reduce spam, please verify your email. We&apos;ll send a short code; enter it
                    here, then you can send your message.
                  </span>
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-400">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-400">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={sendCode}
                      disabled={sendingCode || !isValidEmail(email)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:opacity-50"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden />
                      {sendingCode ? "Sending code…" : codeSent ? "Resend code" : "Email me a code"}
                    </button>
                    {verifiedEmail && email.trim().toLowerCase() === verifiedEmail && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400/90">
                        <ShieldCheck className="h-4 w-4" aria-hidden />
                        Email verified
                      </span>
                    )}
                  </div>
                  {sendError ? (
                    <p className="whitespace-pre-line text-sm text-red-400" role="alert">
                      {sendError}
                    </p>
                  ) : null}

                  {codeSent && !verifiedEmail ? (
                    <div className="rounded-lg border border-zinc-700 bg-zinc-950/40 p-4">
                      <label htmlFor="contact-code" className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <KeyRound className="h-4 w-4" aria-hidden />
                        6-digit code
                      </label>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          id="contact-code"
                          type="text"
                          inputMode="numeric"
                          pattern="\d{6}"
                          maxLength={6}
                          value={code}
                          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="000000"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 font-mono text-lg tracking-widest text-white outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 sm:max-w-[11rem]"
                        />
                        <button
                          type="button"
                          onClick={verifyCode}
                          disabled={verifying || code.length !== 6}
                          className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
                        >
                          {verifying ? "Checking…" : "Verify code"}
                        </button>
                      </div>
                      {verifyError ? (
                        <p className="mt-2 text-sm text-red-400" role="alert">
                          {verifyError}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-400">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project..."
                      className="mt-1.5 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    {verifiedEmail &&
                    email.trim().toLowerCase() === verifiedEmail &&
                    message.trim().length > 0 &&
                    message.trim().length < MIN_MESSAGE_LENGTH ? (
                      <p className="mt-1.5 text-sm text-amber-400/90">
                        Add a bit more to your message ({MIN_MESSAGE_LENGTH} characters minimum) to
                        enable Send.
                      </p>
                    ) : null}
                  </div>
                </div>

                {submitError ? (
                  <p className="mt-4 text-sm text-red-400" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    !verifiedEmail ||
                    email.trim().toLowerCase() !== verifiedEmail ||
                    !name.trim() ||
                    message.trim().length < MIN_MESSAGE_LENGTH
                  }
                  title={
                    submitting
                      ? "Sending…"
                      : !verifiedEmail
                        ? "Verify your email first"
                        : email.trim().toLowerCase() !== verifiedEmail
                          ? "Email must match the one you verified"
                          : !name.trim()
                            ? "Enter your name"
                            : message.trim().length < MIN_MESSAGE_LENGTH
                              ? `Message needs at least ${MIN_MESSAGE_LENGTH} characters`
                              : "Send your message"
                  }
                  className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
