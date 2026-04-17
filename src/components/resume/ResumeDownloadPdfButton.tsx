"use client";

import { useCallback, useState } from "react";
import { Download } from "lucide-react";
import { resumeElementToPdfBlob } from "@/lib/resume-pdf-export";

const RESUME_EXPORT_ID = "resume-pdf-export";
const PDF_FILENAME = "Altin-Demaj-Resume.pdf";

function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ResumeDownloadPdfButton() {
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(async () => {
    const el = document.getElementById(RESUME_EXPORT_ID);
    if (!el) return;

    setBusy(true);
    try {
      let blob: Blob;
      try {
        blob = await resumeElementToPdfBlob(el as HTMLElement, {
          marginMm: 8,
          scale: 1.75,
        });
      } catch {
        blob = await resumeElementToPdfBlob(el as HTMLElement, {
          marginMm: 8,
          scale: 1.2,
        });
      }
      triggerFileDownload(blob, PDF_FILENAME);
    } catch (err) {
      console.error("PDF export failed:", err);
      const detail = err instanceof Error ? err.message : String(err);
      alert(
        `Could not generate the PDF (${detail}). You can use the browser menu: Print → Save as PDF.`,
      );
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      aria-busy={busy}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white disabled:pointer-events-none disabled:opacity-50 print:hidden"
    >
      <Download className="h-4 w-4" aria-hidden />
      {busy ? "Preparing…" : "Download PDF"}
    </button>
  );
}
