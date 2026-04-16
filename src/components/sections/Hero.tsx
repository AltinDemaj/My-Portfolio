"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, FileText, Gamepad2, Boxes, Glasses, Code2, Clock, Layers } from "lucide-react";
import { siteOwner } from "@/data/portfolio";

const UNITY_GIF_PATH = "/unity-editor.gif";

const BADGES = [
  { icon: Gamepad2, label: "Unity Developer" },
  { icon: Boxes, label: "2D & 3D Games" },
  { icon: Glasses, label: "AR/VR" },
  { icon: Code2, label: "Full-Stack" },
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
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 md:px-8 md:pt-28"
      style={{ perspective: "1200px" }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 min-h-full">
        <img
          src={UNITY_GIF_PATH}
          alt=""
          aria-hidden
          className={`h-full min-h-screen w-full object-cover object-center transition-opacity duration-500 ${gifError ? "hidden" : "opacity-100"}`}
          onError={() => setGifError(true)}
        />
        {/* Vertical overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.48) 40%, rgba(8,8,8,0.82) 100%)",
          }}
        />
        {/* Left-to-right cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0.02) 100%)",
          }}
        />
      </div>

      {/* Soft radial glow behind text block */}
      <div
        className="pointer-events-none absolute top-1/2 left-[20%] z-[1] h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 sm:h-[700px] sm:w-[800px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 z-[1] h-[300px] w-[300px] rounded-full opacity-20 sm:h-[500px] sm:w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)",
          transform: "translateZ(-100px) scale(1.2)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-20 left-0 z-[1] h-[300px] w-[300px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          transform: "translateZ(-80px) scale(1.15)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* ── LEFT ── */}
        <div className="order-2 lg:order-1">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10"
          >
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-600/40 bg-black/40 px-3 py-1 text-[12px] font-medium text-zinc-300 backdrop-blur-md"
              >
                <Icon className={`h-3 w-3 ${label === "Unity Developer" ? "text-amber-400/80" : "text-zinc-400"}`} />
                {label === "Unity Developer" ? (
                  <span className="bg-gradient-to-r from-amber-400/90 to-yellow-300/90 bg-clip-text text-transparent">{label}</span>
                ) : (
                  label
                )}
              </span>
            ))}
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-[2.2rem] font-bold tracking-[-0.03em] text-white sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.8rem] lg:leading-[1]"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)",
            }}
          >
            {siteOwner.name}
          </motion.h1>

          {/* Main statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-3 text-xl font-semibold leading-[1.25] tracking-[-0.01em] sm:mt-4 sm:text-2xl md:text-3xl lg:text-[2.2rem]"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            <span className="text-zinc-100">Creative </span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(200,160,40,0.3)]">
              Unity
            </span>
            <span className="text-zinc-100"> Developer</span>
          </motion.p>

          {/* Secondary line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 sm:mt-4 sm:text-[0.8125rem]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            Unity Games
            <span className="mx-2.5 text-zinc-600">•</span>
            AR/VR
            <span className="mx-2.5 text-zinc-600">•</span>
            Interactive Web Apps
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.4, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 h-px max-w-sm origin-left bg-gradient-to-r from-zinc-500/60 to-transparent sm:mt-10"
          />

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-7 max-w-lg text-[0.875rem] leading-[1.8] text-zinc-300 text-pretty sm:mt-8 sm:text-[0.9375rem] md:text-base"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
          >
            I design and build immersive digital products — from Unity games
            and AR/VR experiences to full-stack web platforms. My focus is on
            performance, smooth user experience, and turning ideas into
            polished real-world products.
          </motion.p>

          {/* Proof row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:mt-8"
          >
            {[
              { icon: Clock, value: "5+", label: "Years Experience" },
              { icon: Layers, value: "20+", label: "Projects Delivered" },
            ].map(({ icon: Icon, value, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-zinc-400 sm:text-[0.8125rem]"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
              >
                <Icon className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-semibold text-zinc-200">{value}</span>
                {label}
              </span>
            ))}
            <span className="hidden text-zinc-700 sm:inline">|</span>
            <span
              className="text-[0.7rem] font-medium tracking-wide text-zinc-500 sm:text-[0.75rem]"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              Mobile · Desktop · Web
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58 }}
            className="mt-10 flex flex-wrap gap-3 sm:mt-12 sm:gap-4"
          >
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-xl shadow-black/25 transition-all duration-200 hover:bg-zinc-100 hover:shadow-2xl hover:-translate-y-0.5 sm:px-7 sm:py-3"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/50 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-zinc-200 shadow-lg shadow-black/20 transition-all duration-200 hover:border-zinc-500 hover:bg-white/[0.1] hover:-translate-y-0.5 sm:px-7 sm:py-3"
            >
              Contact Me
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/40 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-300 shadow-lg shadow-black/15 transition-all duration-200 hover:border-zinc-500 hover:bg-white/[0.07] hover:text-zinc-200 hover:-translate-y-0.5 sm:px-7 sm:py-3"
            >
              Resume
              <FileText className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Photo card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pt-8 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-xs"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
                >
                  {siteOwner.name}
                </p>
                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-400/80 sm:text-[10px]">
                  Available for work
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
