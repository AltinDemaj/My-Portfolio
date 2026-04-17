import { getFontEmbedCSS, toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

const PAGE_BG = "#0a0a0a";

/**
 * html-to-image rasterizes via SVG foreignObject using the real document styles
 * (Tailwind / oklch / gradients) — same engine as what you see on screen.
 * Cap scale so canvas dimensions stay under common browser limits.
 */
function cappedPixelRatio(el: HTMLElement, requested: number): number {
  const w = Math.max(1, Math.ceil(el.getBoundingClientRect().width));
  const h = Math.max(1, Math.ceil(el.scrollHeight));
  const maxEdge = 8192;
  const byW = maxEdge / w;
  const byH = maxEdge / h;
  return Math.max(1, Math.min(requested, byW, byH, 2.5));
}

function canvasToPagedPdf(
  canvas: HTMLCanvasElement,
  marginMm: number,
  contentWmm: number,
  contentHmm: number,
): Blob {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: true,
  });

  const pxFullHeight = canvas.height;
  const pxFullWidth = canvas.width;
  const pxPageHeight = Math.floor((pxFullWidth * contentHmm) / contentWmm);
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = pxFullWidth;
  const pageCtx = pageCanvas.getContext("2d");
  if (!pageCtx) throw new Error("Could not get canvas context");

  const nPages = Math.max(1, Math.ceil(pxFullHeight / pxPageHeight));

  for (let page = 0; page < nPages; page++) {
    const isLast = page === nPages - 1;
    const remainder = pxFullHeight % pxPageHeight;
    const sliceH =
      isLast && remainder !== 0 ? remainder : pxPageHeight;

    pageCanvas.height = sliceH;
    pageCtx.fillStyle = PAGE_BG;
    pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    pageCtx.drawImage(canvas, 0, page * pxPageHeight, pxFullWidth, sliceH, 0, 0, pxFullWidth, sliceH);

    const sliceMMHeight = (sliceH * contentWmm) / pxFullWidth;
    const imgData = pageCanvas.toDataURL("image/png");

    if (page > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", marginMm, marginMm, contentWmm, sliceMMHeight, undefined, "FAST");
  }

  return pdf.output("blob");
}

/**
 * PDF from the live resume DOM — visually matches /resume because the browser
 * paints the same CSS (no html2canvas stylesheet re-parse).
 */
export async function resumeElementToPdfBlob(
  element: HTMLElement,
  options: { marginMm: number; scale: number },
): Promise<Blob> {
  const { marginMm, scale } = options;
  const contentWmm = 210 - 2 * marginMm;
  const contentHmm = 297 - 2 * marginMm;
  const pr = cappedPixelRatio(element, scale);

  let fontEmbedCSS: string | undefined;
  try {
    fontEmbedCSS = await getFontEmbedCSS(element, { cacheBust: true });
  } catch {
    fontEmbedCSS = undefined;
  }

  const canvas = await toCanvas(element, {
    cacheBust: true,
    backgroundColor: PAGE_BG,
    pixelRatio: pr,
    skipFonts: false,
    skipAutoScale: false,
    fontEmbedCSS,
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

  return canvasToPagedPdf(canvas, marginMm, contentWmm, contentHmm);
}
