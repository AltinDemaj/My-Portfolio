"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import {
  projects,
  projectOpensDetailModal,
} from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { useProjectModal } from "@/contexts/ProjectModalContext";

const categoryColors: Record<Project["category"], string> = {
  Unity: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Web: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "AR/VR": "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

function thumbnailObjectClass(pos: Project["thumbnailObjectPosition"]) {
  if (pos === "top") return "object-top";
  if (pos === "bottom") return "object-bottom";
  if (pos === "left-bottom") return "object-left-bottom";
  if (pos === "left-center") return "object-left";
  return "object-center";
}

/** Branded 16:9 hero when no poster image */
function EclipseBrandedHero() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#06060a]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(39,39,42,0.5) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 70% 20%, rgba(88,28,135,0.12) 0%, transparent 45%), linear-gradient(180deg, #0c0c10 0%, #050508 50%, #020203 100%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.04) 28%, transparent 52%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        {[
          [12, 18],
          [24, 62],
          [78, 14],
          [88, 38],
          [18, 72],
          [62, 8],
          [92, 78],
          [44, 52],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 md:top-[40%]"
        aria-hidden
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full drop-shadow-[0_0_40px_rgba(201,162,39,0.25)]"
        >
          <defs>
            <radialGradient id="eclipse-glow-fs" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201,162,39,0.45)" />
              <stop offset="45%" stopColor="rgba(201,162,39,0.12)" />
              <stop offset="100%" stopColor="rgba(201,162,39,0)" />
            </radialGradient>
            <filter id="eclipse-soft-fs" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="200" cy="200" r="118" fill="url(#eclipse-glow-fs)" />
          <circle
            cx="200"
            cy="200"
            r="72"
            fill="#1a1a1f"
            stroke="rgba(201,162,39,0.35)"
            strokeWidth="2"
            filter="url(#eclipse-soft-fs)"
          />
          <circle cx="228" cy="196" r="68" fill="#06060a" opacity="0.92" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_45%,transparent_0%,rgba(2,2,4,0.5)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-zinc-950/90"
        aria-hidden
      />
    </div>
  );
}

function getProjectLinkHref(project: Project): string | null {
  const raw = project.liveUrl ?? project.projectUrl;
  if (typeof raw !== "string" || raw.trim() === "" || raw === "#") {
    return null;
  }
  return raw;
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" as const },
};

/** Time each slide stays on screen before advancing */
const SLIDE_MS = 3400;
/** Subtle Ken Burns zoom end scale (starts at 1) */
const SLIDE_ZOOM_SCALE = 1.1;

function FeaturedSlideCta({ project }: { project: Project }) {
  const requestOpenProject = useProjectModal()?.requestOpenProject;
  const linkHref = getProjectLinkHref(project);
  const modalCapable = projectOpensDetailModal(project);

  const ctaLabel =
    project.ctaLabel?.trim() ||
    (modalCapable
      ? "View walkthrough"
      : linkHref
        ? linkHref.startsWith("http")
          ? "Open project"
          : "View project"
        : null);

  const baseBtn =
    "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 sm:mt-4 sm:w-auto sm:justify-start sm:px-5 sm:text-sm";

  const openModalFromFeatured = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    requestOpenProject?.(project.id);
  };

  if (modalCapable) {
    if (requestOpenProject) {
      return (
        <button type="button" className={baseBtn} onClick={openModalFromFeatured}>
          {ctaLabel ?? "View details"}
          <Play className="h-4 w-4" />
        </button>
      );
    }
    return (
      <Link href="#projects" className={baseBtn}>
        {ctaLabel ?? "View in projects"}
        <Play className="h-4 w-4" />
      </Link>
    );
  }

  if (linkHref?.startsWith("http")) {
    return (
      <Link
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
      >
        {ctaLabel ?? "Open project"}
        <Play className="h-4 w-4" />
      </Link>
    );
  }

  if (linkHref) {
    return (
      <Link href={linkHref} className={baseBtn}>
        {ctaLabel ?? "View project"}
        <Play className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <span className="mt-4 inline-flex items-center rounded-lg border border-zinc-700/80 bg-zinc-900/50 px-5 py-2.5 text-sm font-medium text-zinc-500">
      Coming soon
    </span>
  );
}

export function FeaturedShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = projects.length;
  const project = n > 0 ? projects[index % n] : null;

  useEffect(() => {
    if (n <= 1 || paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [n, paused]);

  if (!project) return null;

  const poster = project.image?.trim();

  return (
    <section className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Featured
          </span>
          <div className="relative mt-1 min-h-[2.25rem] sm:min-h-[2.75rem]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={project.id}
                {...fade}
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {project.title}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-transparent md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-video w-full shrink-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                {...fade}
                className="absolute inset-0 overflow-hidden"
              >
                <motion.div
                  className="h-full w-full origin-center will-change-transform"
                  initial={{ scale: 1 }}
                  animate={{ scale: SLIDE_ZOOM_SCALE }}
                  transition={{
                    duration: SLIDE_MS / 1000,
                    ease: "linear",
                  }}
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt=""
                      className={`h-full w-full object-cover ${thumbnailObjectClass(
                        project.thumbnailObjectPosition,
                      )}`}
                    />
                  ) : (
                    <EclipseBrandedHero />
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center pt-0 md:-mt-2"
              aria-hidden
            >
              <motion.div
                className="rounded-full border border-amber-500/40 bg-black/45 p-6 shadow-[0_0_48px_rgba(201,162,39,0.15)] backdrop-blur-sm md:p-7"
                initial={{ scale: 0.92, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <Play className="h-10 w-10 text-amber-200/90 md:h-11 md:w-11" />
              </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] hidden h-36 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent md:block md:h-40" />

            {n > 1 ? (
              <div className="absolute bottom-4 left-0 right-0 z-[4] flex flex-wrap justify-center gap-1.5 px-4 sm:gap-2 md:bottom-[4.5rem]">
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Show ${p.title}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-white"
                        : "w-1.5 bg-zinc-500 hover:bg-zinc-400"
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="pointer-events-auto relative z-[5] w-full p-4 sm:p-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-gradient-to-t md:from-zinc-950 md:via-zinc-950/95 md:to-transparent md:px-8 md:pb-8 md:pt-24">
            <AnimatePresence mode="wait">
              <motion.div key={project.id} {...fade}>
                <span
                  className={`inline-block rounded-md border px-2.5 py-1 text-xs font-medium ${categoryColors[project.category]}`}
                >
                  {project.category}
                </span>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-zinc-500">
                  {project.tech.slice(0, 5).join(" · ")}
                </p>
                <p className="mt-1.5 max-w-none text-xs leading-relaxed text-zinc-400 text-pretty break-words sm:mt-2 sm:max-w-2xl sm:text-sm md:text-[0.9375rem]">
                  {project.description}
                </p>
                <FeaturedSlideCta project={project} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
