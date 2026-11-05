"use client";

import { motion } from "framer-motion";
import { Target, Zap, Users } from "lucide-react";

const highlights = [
  {
    icon: Target,
    value: "End-to-end",
    label: "Full-stack products from UI to Postgres & deploy",
  },
  {
    icon: Zap,
    value: "Ownership",
    label: "Monitoring, release guards, security tests in prod",
  },
  {
    icon: Users,
    value: "Collaboration",
    label: "Cross-functional teams & mentoring",
  },
];

const experienceBullets = [
  "Built and operate Marketi Juaj end to end: Next.js/React/TypeScript UI, Supabase Postgres RPCs + RLS, checkout, invoice OCR, ATK fiscalization work, subscriptions, owner PWA, and weighing-scale support.",
  "Own production reliability for that SaaS — health/uptime checks, staged Vercel promote with safety guards, and security hardening covered by automated tests.",
  "Ship full-stack web products with React, Next.js, TypeScript, Postgres, and Ruby on Rails when the stack calls for it.",
  "Developed immersive 2D and 3D games using Unity, with a focus on innovative gameplay and visuals.",
  "Collaborated with cross-functional teams to design and implement features aligned with project vision.",
  "Optimized game performance — identified and resolved bottlenecks for significant frame rate improvements across platforms.",
  "Integrated APIs, analytics, and monetization solutions to enhance functionality and user experience.",
  "Designed and maintained project documentation; used Git for version control and effective collaboration.",
  "Implemented user feedback and conducted testing to improve game design and player satisfaction.",
  "Developed and released multiple successful games on various platforms with strong ratings and reviews.",
  "Built AR/VR experiences and presented concepts to stakeholders; mentored junior developers.",
];

export function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Experience
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 text-pretty break-words sm:text-base">
              Full-stack engineer who ships products end to end — React/Next.js
              TypeScript frontends, Postgres/Supabase APIs, and production
              ownership (monitoring, release promote guards, security tests).
              Flagship case study: Marketi Juaj, a multi-business POS SaaS.
              Unity and AR/VR remain a strong secondary focus for games and
              immersive prototypes.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-500">
              {experienceBullets.slice(0, 6).map((bullet, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, value, label }) => (
              <div
                key={value}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
              >
                <Icon className="h-6 w-6 text-zinc-500" />
                <p className="mt-2 font-display text-lg font-semibold text-white">
                  {value}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
