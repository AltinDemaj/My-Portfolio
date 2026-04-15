"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { STUDIO_DEMO_BASE } from "@/lib/studio-demo/constants";

const work = [
  {
    title: "Lumen Finance",
    tag: "Product",
    img: "/images/studio-demo/work-finance.jpg",
    blurb: "Fintech dashboards and acquisition pages for a regulated launch.",
  },
  {
    title: "Field Notes",
    tag: "Editorial",
    img: "/images/studio-demo/work-editorial.jpg",
    blurb: "Long-form stories and art direction for a quarterly publisher.",
  },
  {
    title: "Atlas Run",
    tag: "Commerce",
    img: "/images/studio-demo/work-commerce.jpg",
    blurb: "Brand and storefront experience for a D2C running label.",
  },
  {
    title: "Mono Health",
    tag: "Web app",
    img: "/images/studio-demo/work-health.jpg",
    blurb: "Calm UI and rhythm for clinicians in a clinical dashboard shell.",
  },
];

const services = [
  {
    title: "Discovery",
    text: "Positioning, IA, and creative direction before a single pixel ships.",
  },
  {
    title: "Production",
    text: "Design systems, Next.js builds, and motion that respects reduced-motion users.",
  },
  {
    title: "Retainer",
    text: "Ongoing experiments — landing pages, campaigns, and iterative polish.",
  },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function StudioWebsitePage() {
  const reduce = useReducedMotion();

  return (
    <main>
      <section className="relative min-h-[min(85vh,720px)] overflow-hidden border-b border-white/5">
        <Image
          src="/images/studio-demo/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/55 via-zinc-950/80 to-zinc-950"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300/90"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Creative studio · demo
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            Confident creative for teams who care how it feels in the browser.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            Oversized type, restrained motion, and a fast first paint.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={`${STUDIO_DEMO_BASE}#work`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              View selected work
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${STUDIO_DEMO_BASE}#contact`}
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Start a project
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="work" className="scroll-mt-20 border-b border-white/5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Selected work
            </h2>
            <p className="mt-2 max-w-lg text-2xl font-semibold tracking-tight text-white">
              Case studies load in a shared shell so browsing stays fluid.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {work.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.05}>
                <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 transition hover:border-violet-500/30 hover:bg-zinc-900/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={w.img}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                      {w.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">{w.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{w.blurb}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-b border-white/5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Services
            </h2>
            <p className="mt-2 max-w-lg text-2xl font-semibold tracking-tight text-white">
              Engagement models with clear deliverables.
            </p>
          </FadeIn>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <li className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6">
                  <CheckCircle2 className="h-5 w-5 text-violet-400" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{s.text}</p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Contact
            </h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Tell us about the launch.
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Honeypot field is hidden from users — spam bots often fill it. This
              form is demo-only.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Demo — nothing was sent. Wire Resend or similar in production.");
              }}
            >
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
              <label className="block text-xs font-medium text-zinc-500">
                Name
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none ring-violet-500/40 placeholder:text-zinc-600 focus:ring-2"
                  placeholder="Alex"
                />
              </label>
              <label className="block text-xs font-medium text-zinc-500">
                Email
                <input
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none ring-violet-500/40 placeholder:text-zinc-600 focus:ring-2"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block text-xs font-medium text-zinc-500">
                Message
                <textarea
                  required
                  rows={4}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none ring-violet-500/40 placeholder:text-zinc-600 focus:ring-2"
                  placeholder="Timeline, scope, links…"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95"
              >
                Send (demo)
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
