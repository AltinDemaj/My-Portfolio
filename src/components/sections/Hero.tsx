"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, FileText, Gamepad2, Boxes, Glasses, Code2 } from "lucide-react";
import { siteOwner } from "@/data/portfolio";

// GIF from Unity thread: https://discussions.unity.com/t/capture-the-gif-unity3d-runtime-gif-maker-released-support/520693
// Use a direct .gif URL (e.g. right‑click the GIF in the thread → Copy image address) if this page URL doesn’t load as image
const UNITY_GIF_PATH = "/unity-editor.gif";
const HERO_ROLE_LINES = [
  "Unity Developer",
  "AR/VR Developer",
  "Full-Stack Developer",
] as const;

export function Hero() {
  const [gifError, setGifError] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-8 md:pt-36"
      style={{ perspective: "1200px" }}
    >
      {/* Unity Editor GIF background – visible by default, hide only on error */}
      <div className="pointer-events-none absolute inset-0 z-0 min-h-full">
        <img
          src={UNITY_GIF_PATH}
          alt=""
          aria-hidden
          className={`h-full min-h-screen w-full object-cover object-center transition-opacity duration-500 ${gifError ? "hidden" : "opacity-100"}`}
          onError={() => setGifError(true)}
        />
        {/* Dark overlay so text stays readable but GIF remains visible */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.85) 100%)",
          }}
        />
      </div>

      {/* Depth layers - 3D-like background */}
      <div
        className="pointer-events-none absolute -top-40 right-0 z-[1] h-[300px] w-[300px] rounded-full opacity-30 sm:h-[500px] sm:w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)",
          transform: "translateZ(-100px) scale(1.2)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-20 left-0 z-[1] h-[300px] w-[300px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          transform: "translateZ(-80px) scale(1.15)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Left: copy (on mobile, photo shows first via order) */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 shadow-lg shadow-black/20">
              <Gamepad2 className="h-3.5 w-3.5" />
              Unity Developer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 shadow-lg shadow-black/20">
              <Boxes className="h-3.5 w-3.5" />
              2D & 3D Games
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 shadow-lg shadow-black/20">
              <Glasses className="h-3.5 w-3.5" />
              AR/VR
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 shadow-lg shadow-black/20">
              <Code2 className="h-3.5 w-3.5" />
              Next.js · Node.js
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display max-w-5xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              textShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {siteOwner.name}
            <span className="mt-3 block text-[1.55rem] leading-[1.15] text-zinc-300 sm:mt-4 sm:text-[2.4rem] md:text-[3rem] lg:text-[3.7rem]">
              {HERO_ROLE_LINES.map((line) => (
                <span
                  key={line}
                  className="block whitespace-nowrap bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-500 bg-clip-text text-transparent"
                >
                  {line}
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 text-pretty sm:mt-6 sm:text-base md:text-lg"
          >
            Building games, AR/VR experiences, and full-stack web platforms with
            Unity, React, Next.js, and Node.js. From concept to deployment, I
            focus on performance, usability, and polished real-world products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-xl shadow-black/30 transition-all hover:bg-zinc-200 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-0.5 sm:px-6 sm:py-3"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800/30 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:border-zinc-500 hover:bg-zinc-800/50 hover:shadow-xl hover:-translate-y-0.5 sm:px-6 sm:py-3"
            >
              Contact Me
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/70 bg-zinc-900/40 px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-lg shadow-black/20 transition-all hover:border-zinc-500 hover:bg-zinc-800/60 hover:shadow-xl hover:-translate-y-0.5 sm:px-6 sm:py-3"
            >
              Resume
              <FileText className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right: photo with 3D-style card (first on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 relative flex justify-center lg:order-2 lg:justify-center"
          style={{ perspective: "1200px" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width);
            y.set((e.clientY - rect.top) / rect.height);
          }}
          onMouseLeave={() => {
            x.set(0.5);
            y.set(0.5);
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]"
          >
            <div
              className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(59,130,246,0.08) 28%, rgba(0,0,0,0) 72%)",
                filter: "blur(26px)",
                transform: "translateZ(-30px)",
              }}
            />
            {/* Layered shadow for depth */}
            <div
              className="absolute -inset-4 rounded-2xl opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 50%)",
                filter: "blur(24px)",
                transform: "translateZ(-20px) scale(0.95)",
              }}
            />
            <div
              className="absolute -inset-2 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-700/80 via-zinc-900/85 to-zinc-950/90"
              style={{
                transform: "translateZ(-10px)",
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            />
            <div
              className="relative overflow-hidden rounded-xl border border-zinc-600/60 bg-zinc-900"
              style={{
                transform: "translateZ(0)",
                boxShadow:
                  "0 20px 40px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="aspect-[3/4] relative">
                <Image
                  src="/images/altin-demaj.png"
                  alt={`${siteOwner.name} - ${siteOwner.title}`}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-300/85">
                  Unity • AR/VR • Full-Stack
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
