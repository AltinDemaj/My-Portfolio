"use client";

import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Gamepad2,
  ChevronRight,
  Maximize2,
  Play,
} from "lucide-react";
import {
  projects,
  projectCategories,
  projectOpensDetailModal,
} from "@/data/portfolio";
import type { Project as ProjectType } from "@/data/portfolio";
import { useProjectModal } from "@/contexts/ProjectModalContext";

const PROJECT_MODAL_HISTORY_KEY = "portfolioProjectModal" as const;

function isProjectModalHistoryState(state: unknown): state is {
  [PROJECT_MODAL_HISTORY_KEY]: true;
} {
  return (
    typeof state === "object" &&
    state !== null &&
    PROJECT_MODAL_HISTORY_KEY in state &&
    (state as Record<string, unknown>)[PROJECT_MODAL_HISTORY_KEY] === true
  );
}

const categoryColors: Record<ProjectType["category"], string> = {
  Unity: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Web: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "AR/VR": "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

function thumbnailObjectClass(pos: ProjectType["thumbnailObjectPosition"]) {
  if (pos === "top") return "object-top";
  if (pos === "bottom") return "object-bottom";
  if (pos === "left-bottom") return "object-left-bottom";
  if (pos === "left-center") return "object-left";
  return "object-center";
}

function thumbnailBgClass(pos: ProjectType["thumbnailObjectPosition"]) {
  if (pos === "top") return "bg-top";
  if (pos === "bottom") return "bg-bottom";
  if (pos === "left-bottom") return "bg-[position:left_bottom]";
  if (pos === "left-center") return "bg-[position:left_center]";
  return "bg-center";
}

/** Blurred, stretched same-image layers (background on a div; avoids WebKit black when blurring img). */
function ProjectImageBackdrop({
  imageUrl,
  position,
}: {
  imageUrl: string;
  position?: ProjectType["thumbnailObjectPosition"];
}) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-[18%] bg-cover bg-no-repeat opacity-[0.7] blur-[34px] saturate-[1.2] [transform:translate3d(0,0,0)] ${thumbnailBgClass(position)}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/5 to-zinc-950/20"
        aria-hidden
      />
    </>
  );
}

function ThumbnailPosterOverlay({
  overlay,
  compact,
  variant = "card",
}: {
  overlay: NonNullable<ProjectType["thumbnailOverlay"]>;
  compact?: boolean;
  variant?: "card" | "modal";
}) {
  const isModal = variant === "modal";
  const center = overlay.placement === "center";
  const redOutline = overlay.headlineTone === "red-outline";

  const headlineStroke = redOutline
    ? isModal
      ? "4px #000"
      : compact
        ? "1.75px #000"
        : "3.25px #000"
    : undefined;

  const sublineStroke = redOutline
    ? isModal
      ? "2.25px #000"
      : compact
        ? "1px #000"
        : "1.75px #000"
    : undefined;

  const headlineClass = `font-display font-bold leading-[0.95] tracking-tight ${
    redOutline
      ? "text-red-500 drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)]"
      : "text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]"
  } ${
    isModal
      ? "text-4xl sm:text-5xl md:text-6xl"
      : compact
        ? "text-lg sm:text-xl md:text-2xl"
        : "text-2xl sm:text-3xl md:text-4xl"
  }`;

  const sublineClass = `mt-1 font-display font-semibold uppercase tracking-[0.18em] ${
    redOutline
      ? "text-red-500 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
      : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
  } ${
    isModal
      ? "text-sm sm:text-base md:text-lg"
      : compact
        ? "text-[7px] sm:text-[9px]"
        : "text-[10px] sm:text-xs md:text-sm"
  }`;

  const redOutlineTextShadow = redOutline
    ? compact
      ? "1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 0.85px 0.85px 0 #000, -0.85px -0.85px 0 #000, 0.85px -0.85px 0 #000, -0.85px 0.85px 0 #000"
      : isModal
        ? "2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1.75px 1.75px 0 #000, -1.75px -1.75px 0 #000, 1.75px -1.75px 0 #000, -1.75px 1.75px 0 #000"
        : "1.5px 0 0 #000, -1.5px 0 0 #000, 0 1.5px 0 #000, 0 -1.5px 0 #000, 1.25px 1.25px 0 #000, -1.25px -1.25px 0 #000, 1.25px -1.25px 0 #000, -1.25px 1.25px 0 #000"
    : undefined;

  const headlineStyle = {
    fontFamily: "var(--font-syne), sans-serif",
    ...(headlineStroke
      ? {
          WebkitTextStroke: headlineStroke,
          paintOrder: "stroke fill" as const,
          textShadow: redOutlineTextShadow,
        }
      : {}),
  };

  const sublineStyle = {
    fontFamily: "var(--font-syne), sans-serif",
    ...(sublineStroke
      ? { WebkitTextStroke: sublineStroke, paintOrder: "stroke fill" as const }
      : {}),
  };

  if (center) {
    return (
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_50%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.4)_52%,transparent_72%)]"
          aria-hidden
        />
        <div
          className={`relative z-[1] flex max-w-full flex-col items-center justify-center ${
            isModal ? "px-4 md:px-6" : compact ? "px-2" : "px-4"
          }`}
        >
          <p className={headlineClass} style={headlineStyle}>
            {overlay.headline}
          </p>
          {overlay.subline ? (
            <p className={sublineClass} style={sublineStyle}>
              {overlay.subline}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-[2] bg-gradient-to-b from-black/65 via-black/20 to-transparent text-center ${
        isModal
          ? "px-4 pb-16 pt-6 md:pb-20 md:pt-10"
          : compact
            ? "px-1.5 pb-5 pt-1.5 sm:px-2 sm:pb-6 sm:pt-2"
            : "px-3 pb-8 pt-3"
      }`}
    >
      <p className={headlineClass} style={headlineStyle}>
        {overlay.headline}
      </p>
      {overlay.subline ? (
        <p className={sublineClass} style={sublineStyle}>
          {overlay.subline}
        </p>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
  compact = false,
}: {
  project: ProjectType;
  index: number;
  onClick?: () => void;
  compact?: boolean;
}) {
  const rawHref = project.liveUrl ?? project.projectUrl;
  const linkHref =
    typeof rawHref === "string" &&
    rawHref.trim() !== "" &&
    rawHref !== "#"
      ? rawHref
      : null;
  const opensModal = projectOpensDetailModal(project) && !!onClick;

  const content = (
    <>
      <div
        className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/40 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 ${
          compact ? "flex h-full w-full min-w-0 max-w-full flex-col" : ""
        }`}
        style={{
          boxShadow:
            "0 4px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.02)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-zinc-900/40">
          {project.image ? (
            <>
              <ProjectImageBackdrop
                imageUrl={project.image}
                position={project.thumbnailObjectPosition}
              />
              <img
                src={project.image}
                alt=""
                draggable={false}
                loading="lazy"
                className={`absolute inset-0 z-[1] h-full w-full object-cover ${thumbnailObjectClass(project.thumbnailObjectPosition)} transition-transform duration-500 group-hover:scale-105`}
              />
              {project.thumbnailOverlay ? (
                <ThumbnailPosterOverlay
                  overlay={project.thumbnailOverlay}
                  compact={compact}
                />
              ) : null}
            </>
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)",
              }}
            />
          )}
          <span
            className={`absolute left-2 top-2 z-[3] rounded-md border px-1.5 py-0.5 text-[10px] font-medium sm:left-3 sm:top-3 sm:px-2 sm:text-xs ${categoryColors[project.category]}`}
          >
            {project.category}
          </span>
          <span className="absolute right-2 top-2 z-[3] rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 sm:right-3 sm:top-3 sm:p-2">
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </div>
        <div className={`flex min-h-0 flex-1 flex-col ${compact ? "p-2 sm:p-4 md:p-4" : "p-5"}`}>
          <h3 className={`shrink-0 font-display font-semibold text-white transition-colors group-hover:text-zinc-200 ${compact ? "text-sm sm:text-base md:text-lg" : "text-lg"}`}>
            {project.title}
          </h3>
          <p
            className={`mt-0.5 min-w-0 shrink-0 break-words text-zinc-500 line-clamp-2 sm:mt-1 ${compact ? "text-[11px] leading-snug sm:text-sm" : "text-sm leading-relaxed"}`}
          >
            {project.description}
          </p>
          <div className={`shrink-0 flex flex-wrap ${compact ? "mt-1.5 gap-1 sm:mt-2 sm:gap-1.5" : "mt-3 gap-2"}`}>
            {project.tech.slice(0, 4).map((t, idx) => (
              <span key={t} className="text-xs text-zinc-600">
                {t}
                {idx < Math.min(project.tech.length, 4) - 1 ? " ·" : ""}
              </span>
            ))}
          </div>
          <span className={`mt-auto inline-flex shrink-0 items-center gap-1 font-medium text-zinc-400 transition-colors group-hover:text-white ${compact ? "mt-2 text-[11px] sm:mt-2 sm:text-sm" : "mt-3 text-sm"}`}>
            {project.ctaLabel ?? "View Project"}
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </div>
      </div>
    </>
  );

  if (opensModal) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.3 }}
        className={`group cursor-pointer ${compact ? "flex h-full min-h-0 flex-col" : ""}`}
        style={{ perspective: "800px" }}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title}`}
      >
        {content}
      </motion.article>
    );
  }

  if (!linkHref) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.3 }}
        className={`group ${compact ? "flex h-full min-h-0 flex-col" : ""}`}
        style={{ perspective: "800px" }}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.3 }}
      className={`group ${compact ? "flex h-full min-h-0 flex-col" : ""}`}
      style={{ perspective: "800px" }}
    >
      <Link
        href={linkHref}
        className={compact ? "flex h-full min-h-0 flex-col" : "block"}
        target={linkHref.startsWith("http") ? "_blank" : undefined}
        rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    </motion.article>
  );
}

/** Full-site iframe (e.g. deployed Next.js app). Shown above screenshot walkthrough. */
function SiteEmbedBlock({ project }: { project: ProjectType }) {
  const url = project.embedUrl?.trim();
  if (!url) return null;
  const isBuiltinPath = url.startsWith("/");
  const isLoopback =
    url.includes("127.0.0.1") || url.includes("localhost");

  return (
    <div className="mt-10">
      <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Live demo
      </h3>
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title={`${project.title} — live demo`}
            src={url}
            className="absolute inset-0 h-full w-full border-0 bg-zinc-950"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {isBuiltinPath ? (
          <p className="max-w-xl text-xs leading-relaxed text-zinc-500">
            Interactive demo served from this portfolio — runs in your browser
            with no separate backend (see project description for what is
            simulated).
          </p>
        ) : isLoopback ? (
          <p className="max-w-xl text-xs leading-relaxed text-zinc-500">
            Demo URL points at a local dev server. Ensure it is running, or set{" "}
            <code className="rounded bg-zinc-800 px-1 text-zinc-300">
              NEXT_PUBLIC_PIZZA_DEMO_URL
            </code>{" "}
            to a deployed app.
          </p>
        ) : (
          <p className="max-w-xl text-xs leading-relaxed text-zinc-500">
            Hosted demo — use the frame below or open in a new tab if your
            browser blocks embedding.
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white sm:self-start"
        >
          Open demo in new tab
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}

/** Video embed: iframe only (client-only to avoid hydration mismatch). Game embed: cover + "Play game" that opens fullscreen. */
function GameEmbedBlock({
  project,
  playUrl,
}: {
  project: ProjectType;
  playUrl: string;
}) {
  const [showFullView, setShowFullView] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const isVideo = project.embedType === "video";

  const handlePlay = useCallback(() => {
    setShowFullView(true);
  }, []);

  const handleCloseFullView = useCallback(() => {
    setShowFullView(false);
  }, []);

  useEffect(() => {
    if (!showFullView) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFullView(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [showFullView]);

  const coverImage = project.image || "/images/ZombieCrusherImage.png";

  if (isVideo) {
    const ratio = project.embedAspectRatio ?? "16/9";
    const paddingBottom =
      ratio === "1/1" ? "100%" : ratio === "4/3" ? "75%" : "56.25%";
    const poster = project.image || "";
    return (
      <div className="mt-10">
        <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Video
        </h3>
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-800 bg-black">
          <div className="relative w-full" style={{ paddingBottom }}>
            {videoStarted && project.embedUrl ? (
              <iframe
                title={project.title}
                src={project.embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                {poster ? (
                  <>
                    <div
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-sm ${thumbnailBgClass(project.thumbnailObjectPosition)}`}
                      style={{ backgroundImage: `url(${poster})` }}
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-black/50"
                      aria-hidden
                    />
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setVideoStarted(true)}
                  className="relative z-[1] flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-base font-bold text-white shadow-xl transition-all hover:bg-violet-400 hover:scale-105 active:scale-100 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
                >
                  <Play className="h-5 w-5 fill-current sm:h-7 sm:w-7" />
                  Play video
                </button>
              </div>
            )}
          </div>
          {playUrl && playUrl !== "#" && (
            <Link
              href={playUrl}
              className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-lg bg-black/70 p-2.5 text-white transition-colors hover:bg-black/90 hover:text-white"
              aria-label="Open video in new tab"
            >
              <Maximize2 className="h-5 w-5" />
            </Link>
          )}
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Press Play video to load the player (no autoplay). Use the player
          controls for sound and fullscreen.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Play in browser
      </h3>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black">
        {/* No iframe here: loading the embed behind the cover still runs WebGL/audio.
            Embed mounts only after "Play game" opens the overlay below. */}
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <div
            className={`absolute inset-0 bg-cover bg-no-repeat opacity-90 ${thumbnailBgClass(project.thumbnailObjectPosition)}`}
            style={{
              backgroundImage: `url(${coverImage})`,
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <button
            type="button"
            onClick={handlePlay}
            className="relative z-10 flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-base font-bold text-black shadow-xl transition-all hover:bg-amber-400 hover:scale-105 active:scale-100 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
          >
            <Gamepad2 className="h-5 w-5 sm:h-7 sm:w-7" />
            Play game
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Click Play to open the game in full view. Press Esc or the close button to exit.
      </p>

      {showFullView && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black">
          <div className="absolute right-2 top-2 z-[100] sm:right-4 sm:top-4">
            <button
              type="button"
              onClick={handleCloseFullView}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleCloseFullView();
              }}
              className="min-h-[44px] min-w-[44px] rounded-lg bg-black/70 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:bg-white/30"
              aria-label="Close"
            >
              Close (Esc)
            </button>
          </div>
          <iframe
            title={`${project.title} — full view`}
            src={project.embedUrl}
            className="h-full w-full flex-1 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ProjectType;
  onClose: () => void;
}) {
  const playUrl = project.liveUrl ?? project.embedUrl ?? "#";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.fullscreenElement) return;
      onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useLayoutEffect(() => {
    const prevScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const html = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - html.clientWidth;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      history.scrollRestoration = prevScrollRestoration;
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col overscroll-none bg-zinc-950"
    >
      <ProjectDetailModalBody project={project} playUrl={playUrl} onClose={onClose} />
    </motion.div>
  );
}

function ProjectScreenshotGallery({
  items,
  category,
}: {
  items: NonNullable<ProjectType["screenshotGallery"]>;
  category: ProjectType["category"];
}) {
  const isWeb = category === "Web";
  const heading = isWeb ? "Product tour" : "Walkthrough";
  const subtext = isWeb
    ? "Key screens and flows — from landing through checkout or success states."
    : "In-engine screenshots in order — from first menu to the end of a round.";

  return (
    <div className="mt-12 border-t border-zinc-800/80 pt-10">
      <h3
        className="mb-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        {heading}
      </h3>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-500 text-pretty break-words">
        {subtext}
      </p>
      <div className="space-y-10 md:space-y-14">
        {items.map((step, i) => (
          <article
            key={`${step.src}-${i}`}
            className="rounded-2xl border border-zinc-800/90 bg-zinc-900/35 p-4 shadow-lg md:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/35 bg-amber-500/10 text-sm font-bold text-amber-300"
                aria-hidden
              >
                {i + 1}
              </span>
              <h4
                className="font-display text-lg font-semibold tracking-tight text-white md:text-xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {step.title}
              </h4>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400 md:text-base">
              {step.description}
            </p>
            <div className="overflow-hidden rounded-xl border border-zinc-700/80 bg-black">
              <img
                src={step.src}
                alt={step.title}
                className="w-full object-cover object-top"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailModalBody({
  project,
  playUrl,
  onClose,
}: {
  project: ProjectType;
  playUrl: string;
  onClose: () => void;
}) {
  return (
    <>
      <header className="flex shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4 py-3 md:gap-4 md:px-6">
        <button
          type="button"
          onClick={onClose}
          className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white md:px-3"
          aria-label="Back to projects"
        >
          <ArrowLeft className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h2
          className="min-w-0 flex-1 truncate text-center font-display text-base font-semibold text-white md:text-lg"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {project.title}
        </h2>
        <div className="w-[4.5rem] shrink-0 md:w-[5.25rem]" aria-hidden />
      </header>

      {/* Scrollable content: image + info */}
      <div className="flex-1 overflow-y-auto">
        {/* Game image */}
        <div className="relative w-full bg-zinc-900">
          {project.image ? (
            <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden">
              <ProjectImageBackdrop
                imageUrl={project.image}
                position={project.thumbnailObjectPosition}
              />
              <img
                src={project.image}
                alt={project.title}
                className={
                  project.thumbnailObjectPosition
                    ? `absolute inset-0 z-[1] h-full w-full object-cover ${thumbnailObjectClass(project.thumbnailObjectPosition)}`
                    : "absolute inset-0 z-[1] h-full w-full object-contain object-top"
                }
              />
              {project.thumbnailOverlay &&
              project.thumbnailOverlay.showInModal !== false ? (
                <ThumbnailPosterOverlay
                  overlay={project.thumbnailOverlay}
                  variant="modal"
                />
              ) : null}
            </div>
          ) : (
            <div
              className="aspect-video w-full max-w-4xl mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)",
              }}
            />
          )}
        </div>

        {/* Info block */}
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 md:px-6">
          <p className="text-sm leading-relaxed text-zinc-400 text-pretty break-words sm:text-base">
            {project.description}
          </p>
          {project.collaborators && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 break-words">
              {project.collaborators}
            </p>
          )}
          {project.modalHighlights && project.modalHighlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {project.modalHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400 sm:text-base"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/80" />
                  <span className="min-w-0 break-words text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-zinc-700 bg-zinc-800/50 px-2 py-1 text-xs text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>

          {project.liveUrl?.startsWith("http") &&
            project.liveUrl.includes("itch.io") && (
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  itch.io
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex max-w-full items-start gap-2 break-all text-sm text-amber-400/95 underline-offset-2 hover:text-amber-300 hover:underline"
                >
                  <span>{project.liveUrl}</span>
                  <ExternalLink
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                </a>
              </div>
            )}

          {project.embedUrl && project.embedType === "site" ? (
            <SiteEmbedBlock project={project} />
          ) : null}

          {project.screenshotGallery && project.screenshotGallery.length > 0 ? (
            <ProjectScreenshotGallery
              items={project.screenshotGallery}
              category={project.category}
            />
          ) : null}

          {/* Embedded game or video (not full-site iframe) */}
          {project.embedUrl && project.embedType !== "site" ? (
            <GameEmbedBlock project={project} playUrl={playUrl} />
          ) : null}
        </div>
      </div>
    </>
  );
}

function ProjectCarousel({
  categoryProjects,
  catIndex,
  openModal,
}: {
  categoryProjects: ProjectType[];
  catIndex: number;
  openModal: (p: ProjectType) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const { scrollWidth, clientWidth } = el;
      setCanScroll(scrollWidth - clientWidth > 4);
    };
    check();
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [mounted, categoryProjects.length]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTouch) return;
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
  }, [isTouch]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouch || !dragState.current.isDown) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 5) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }, [isTouch]);

  const onMouseUp = useCallback(() => {
    if (isTouch) return;
    dragState.current.isDown = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollSnapType = "x mandatory";
    el.style.cursor = "";
    el.style.scrollBehavior = "";
  }, [isTouch]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden py-2 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollPaddingRight: "2.5rem",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Extra end padding so the last card can scroll fully clear of the viewport + edge fade */}
        <div className="flex gap-3 sm:gap-6 pr-32 sm:pr-40 md:pr-48">
          {categoryProjects.map((project, i) => (
            <div
              key={project.id}
              data-carousel-card
              className="flex scroll-snap-start flex-shrink-0 w-[200px] min-w-[200px] sm:w-[240px] sm:min-w-[240px] md:w-[260px] md:min-w-[260px] lg:w-[280px] lg:min-w-[280px]"
              style={{ scrollSnapAlign: "start" }}
              onClickCapture={(e) => {
                if (!isTouch && dragState.current.moved) {
                  e.stopPropagation();
                  e.preventDefault();
                  dragState.current.moved = false;
                }
              }}
            >
              <ProjectCard
                project={project}
                index={catIndex * 10 + i}
                onClick={
                  projectOpensDetailModal(project)
                    ? () => openModal(project)
                    : undefined
                }
                compact
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint: only after mount to avoid hydration mismatch */}
      {mounted && canScroll && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#0a0a0a]/90 to-transparent sm:w-8" />
      )}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-px flex-1 max-w-[120px] rounded-full bg-zinc-500/30" />
        {mounted && canScroll && (
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Swipe to see more</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        )}
        <div className="h-px flex-1 max-w-[120px] rounded-full bg-zinc-500/30" />
      </div>
    </div>
  );
}

export function Projects() {
  const [modalProject, setModalProject] = useState<ProjectType | null>(null);
  const projectModal = useProjectModal();
  const setProjectModalOpen = projectModal?.setOpen;
  const pendingOpenProjectId = projectModal?.pendingOpenProjectId;
  const clearPendingOpenProject = projectModal?.clearPendingOpenProject;

  useEffect(() => {
    setProjectModalOpen?.(modalProject !== null);
    return () => setProjectModalOpen?.(false);
  }, [modalProject, setProjectModalOpen]);

  useEffect(() => {
    const onPopState = () => {
      setModalProject(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openModal = useCallback((project: ProjectType) => {
    setModalProject(project);
    const url =
      window.location.pathname +
      window.location.search +
      window.location.hash;
    window.history.pushState({ [PROJECT_MODAL_HISTORY_KEY]: true }, "", url);
  }, []);

  useEffect(() => {
    if (!pendingOpenProjectId || !clearPendingOpenProject) return;
    const p = projects.find((x) => x.id === pendingOpenProjectId);
    if (p && projectOpensDetailModal(p)) {
      openModal(p);
    }
    clearPendingOpenProject();
  }, [pendingOpenProjectId, clearPendingOpenProject, openModal]);

  const closeModal = useCallback(() => {
    if (isProjectModalHistoryState(window.history.state)) {
      window.history.back();
      return;
    }
    setModalProject(null);
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Projects
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 text-pretty sm:text-base">
            Unity games, web apps, and AR/VR work.
          </p>
        </motion.div>

        {projectCategories.map(({ label, category }, catIndex) => {
          const categoryProjects = projects.filter((p) => p.category === category);
          if (categoryProjects.length === 0) return null;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: catIndex * 0.05 }}
              className="mb-16 last:mb-0"
            >
              <h3
                className="mb-6 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {label}
              </h3>

              <ProjectCarousel
                categoryProjects={categoryProjects}
                catIndex={catIndex}
                openModal={openModal}
              />
            </motion.div>
          );
        })}
      </div>

      {modalProject ? (
        <ProjectDetailModal
          key={modalProject.id}
          project={modalProject}
          onClose={closeModal}
        />
      ) : null}
    </section>
  );
}
