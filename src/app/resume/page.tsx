import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderKanban,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { resumeData, siteOwner } from "@/data/portfolio";
import { ResumeDownloadPdfButton } from "@/components/resume/ResumeDownloadPdfLazy";

export const metadata = {
  title: "Resume — Altin Demaj",
  description:
    "Resume for Altin Demaj: Full-Stack Developer (React, Next.js, Ruby on Rails).",
};

export default function ResumePage() {
  const websiteHost = siteOwner.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <main className="resume-print-root min-h-screen bg-background px-4 py-10 text-foreground print:min-h-0 print:bg-background print:px-2 print:py-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <ResumeDownloadPdfButton />
            <a
              href={`mailto:${siteOwner.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact me
            </a>
          </div>
        </div>

        <section
          id="resume-pdf-export"
          className="overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl shadow-black/40 print:rounded-xl print:border-zinc-800 print:bg-zinc-950 print:shadow-none"
        >
          <header className="relative border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-6 py-8 sm:px-10 sm:py-10 print:py-6">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[var(--accent)] print:w-0.5"
              aria-hidden
            />
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div className="pl-3 sm:pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                  Resume / CV
                </p>
                <h1
                  className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {resumeData.headline}
                </h1>
                <p className="mt-2 text-lg font-medium text-[var(--accent)] sm:text-xl">
                  {resumeData.role}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {resumeData.summary}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
                  {resumeData.summarySecondary}
                </p>
              </div>

              <aside className="rounded-xl border border-border bg-zinc-950/60 p-5 lg:mt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Contact
                </p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                  <ContactRow icon={MapPin} label={siteOwner.location} />
                  <ContactRow icon={Mail} label={siteOwner.email} href={`mailto:${siteOwner.email}`} />
                  <ContactRow icon={Phone} label={siteOwner.phone} href={`tel:${siteOwner.phone.replace(/\s/g, "")}`} />
                  <ContactRow
                    icon={Globe}
                    label={websiteHost}
                    href={siteOwner.website}
                    external
                  />
                  <ContactRow
                    icon={BriefcaseBusiness}
                    label={`${resumeData.experienceYears} building interactive software`}
                  />
                </ul>
              </aside>
            </div>
          </header>

          <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
            <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10 print:space-y-8">
              <ResumeBlock
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                title="Experience"
              >
                <div className="space-y-5">
                  {resumeData.experience.map((item) => (
                    <article
                      key={`${item.company}-${item.period}`}
                      className="rounded-xl border border-border bg-zinc-950/50 p-5 print:break-inside-avoid"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/80 pb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                          <p className="text-sm text-zinc-400">
                            {item.company}
                            <span className="text-zinc-600"> · </span>
                            {item.type}
                          </p>
                        </div>
                        <time className="shrink-0 text-sm font-medium text-[var(--accent)]">
                          {item.period}
                        </time>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock
                icon={<FolderKanban className="h-5 w-5" />}
                title="Selected projects"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {resumeData.projectHighlights.slice(0, 8).map((project) => (
                    <div
                      key={project.title}
                      className="rounded-xl border border-border bg-zinc-950/40 p-4 print:break-inside-avoid"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {project.category}
                      </p>
                      <h3 className="mt-1.5 text-base font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeBlock>
            </div>

            <aside className="space-y-8 border-t border-border bg-zinc-950/30 px-6 py-8 lg:border-l lg:border-t-0 sm:px-8 print:space-y-6">
              <ResumeBlock icon={<Code2 className="h-5 w-5" />} title="Skills">
                <div className="space-y-4">
                  {resumeData.skillGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        {group.title}
                      </h3>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-zinc-300"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<Sparkles className="h-5 w-5" />} title="Portfolio">
                <div className="flex flex-wrap gap-2">
                  {resumeData.portfolioHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-card px-3 py-1 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<GraduationCap className="h-5 w-5" />} title="Education">
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-semibold text-white">{resumeData.education.institution}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{resumeData.education.field}</p>
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<Languages className="h-5 w-5" />} title="Languages">
                <ul className="space-y-2 text-sm text-zinc-300">
                  {resumeData.languages.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ResumeBlock>

              <ResumeBlock icon={<FileText className="h-5 w-5" />} title="Additional">
                <ul className="space-y-2 text-sm text-zinc-400">
                  {resumeData.additionalInfo.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ResumeBlock>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const content = href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-zinc-200 underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-white"
    >
      {label}
    </a>
  ) : (
    <span>{label}</span>
  );

  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
      {content}
    </li>
  );
}

function ResumeBlock({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="print:break-inside-avoid">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg border border-border bg-card p-2 text-[var(--accent)]">{icon}</div>
        <h2
          className="text-xl font-bold tracking-tight text-white sm:text-2xl"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
