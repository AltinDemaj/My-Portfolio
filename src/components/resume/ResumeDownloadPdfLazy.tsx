"use client";

import dynamic from "next/dynamic";

export const ResumeDownloadPdfButton = dynamic(
  () => import("./ResumeDownloadPdfButton").then((mod) => mod.ResumeDownloadPdfButton),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        disabled
        className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-500"
      >
        …
      </button>
    ),
  },
);
