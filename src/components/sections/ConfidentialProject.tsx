"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Shield } from "lucide-react";
import { confidentialProject } from "@/data/portfolio";

export function ConfidentialProject() {
  const { title, tagline, body, rightsNotice, inquiryNote, contactHref, contactLabel } =
    confidentialProject;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="mb-14 overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 shadow-lg shadow-black/30"
      aria-labelledby="confidential-project-heading"
    >
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(245, 158, 11, 0.12), transparent 55%)",
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-200/90">
              <Lock className="h-4 w-4 shrink-0" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                {tagline}
              </p>
            </div>
            <h3
              id="confidential-project-heading"
              className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              {title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {body}
            </p>
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
              <span>{rightsNotice}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{inquiryNote}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 lg:mt-1 lg:min-w-[200px]">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              {contactLabel}
            </Link>
            <p className="text-center text-xs text-zinc-600 lg:text-left">
              Use the portfolio contact form or email — serious inquiries only.
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
