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
} from "lucide-react";
import { resumeData, siteOwner } from "@/data/portfolio";
import { ResumeDownloadPdfButton } from "@/components/resume/ResumeDownloadPdfLazy";

export const metadata = {
  title: "Resume — Altin Demaj",
  description:
    "Resume for Altin Demaj: Unity Developer, AR/VR Developer, and Full-Stack Developer.",
};

export default function ResumePage() {
  const websiteHost = siteOwner.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <main className="resume-print-root min-h-screen bg-[#0a0a0a] px-4 py-10 text-zinc-100 print:min-h-0 print:bg-[#0a0a0a] print:px-2 print:py-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
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
          className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/30 print:rounded-2xl print:shadow-none"
        >
          <div className="border-b border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Resume / CV
                </p>
                <h1
                  className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {resumeData.headline}
                </h1>
                <p className="mt-3 text-lg font-medium text-zinc-300">
                  {resumeData.role}
                </p>
                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {resumeData.summary}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 sm:text-base">
                  {resumeData.summarySecondary}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Quick facts
                </p>
                <div className="mt-4 space-y-3 text-sm text-zinc-300">
                  <p className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-zinc-500" />
                    {siteOwner.location}
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-zinc-500" />
                    {siteOwner.email}
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-zinc-500" />
                    {siteOwner.phone}
                  </p>
                  <p className="flex items-center gap-3">
                    <Globe className="h-4 w-4 shrink-0 text-zinc-500" />
                    <a
                      href={siteOwner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-white hover:decoration-zinc-400"
                    >
                      {websiteHost}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-4 w-4 text-zinc-500" />
                    {resumeData.experienceYears} building interactive software
                  </p>
                  <p className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-zinc-500" />
                    Portfolio includes Unity, AR/VR, and full-stack web projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <ResumeBlock
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                title="Professional Experience"
              >
                {resumeData.experience.map((item) => (
                  <div
                    key={`${item.company}-${item.period}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                        <p className="text-sm text-zinc-400">
                          {item.company} · {item.type}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-zinc-500">{item.period}</p>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-3">
                      {item.achievements.map((achievement) => (
                        <div
                          key={achievement}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-sm text-zinc-400"
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ResumeBlock>

              <ResumeBlock
                icon={<FolderKanban className="h-5 w-5" />}
                title="Selected Project Highlights"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {resumeData.projectHighlights.map((project) => (
                    <div
                      key={project.title}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeBlock>
            </div>

            <div className="space-y-8">
              <ResumeBlock icon={<Code2 className="h-5 w-5" />} title="Technical Skills">
                <div className="space-y-4">
                  {resumeData.skillGroups.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        {group.title}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<FolderKanban className="h-5 w-5" />} title="Portfolio Snapshot">
                <div className="flex flex-wrap gap-2">
                  {resumeData.portfolioHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<GraduationCap className="h-5 w-5" />} title="Education">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {resumeData.education.institution}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">{resumeData.education.field}</p>
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<Languages className="h-5 w-5" />} title="Languages">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5">
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {resumeData.languages.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ResumeBlock>

              <ResumeBlock icon={<BriefcaseBusiness className="h-5 w-5" />} title="Additional Information">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5">
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {resumeData.additionalInfo.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ResumeBlock>
            </div>
          </div>
        </section>
      </div>
    </main>
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
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400">
          {icon}
        </div>
        <h2
          className="text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
