"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { Send, Mail, Phone, MapPin, Linkedin, Github, Instagram, FileText } from "lucide-react";
import { siteOwner, socialLinks } from "@/data/portfolio";

const socialIconMap = { Github, Linkedin, Instagram };

export function Contact() {
  const [state, handleSubmit] = useForm("xjgjgjdq");

  return (
    <section
      id="contact"
      className="border-t border-zinc-800/50 px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-zinc-500 leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Send a
              message or reach out via email, phone, or socials.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${siteOwner.email}`}
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0" />
                <span>{siteOwner.email}</span>
              </a>
              <a
                href={`tel:${siteOwner.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>{siteOwner.phone}</span>
              </a>
              <p className="flex items-center gap-3 text-zinc-500">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>{siteOwner.location}</span>
              </p>
              <div className="flex gap-4 pt-2">
                {socialLinks.map(({ label, href, icon }) => {
                  const Icon = socialIconMap[icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              <div className="pt-4">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50"
                >
                  View Resume
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {state.succeeded ? (
              <div className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-10">
                <p className="text-center text-lg font-medium text-white">
                  Thanks for your message — I&apos;ll be in touch!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-400"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-400"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell me about your project..."
                      className="mt-1.5 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:opacity-60 sm:w-auto"
                >
                  {state.submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
