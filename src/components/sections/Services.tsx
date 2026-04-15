"use client";

import { motion } from "framer-motion";
import { Globe, Gamepad2, Sparkles, Layers } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap = { Globe, Gamepad2, Sparkles, Layers };

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Services
          </h2>
          <p className="mt-2 max-w-xl text-zinc-500">
            What I can build for you.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/30"
              >
                {Icon && (
                  <div className="mb-4 inline-flex rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-2.5">
                    <Icon className="h-5 w-5 text-zinc-400" />
                  </div>
                )}
                <h3 className="font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
