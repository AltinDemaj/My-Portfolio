import { Github, Linkedin, Instagram } from "lucide-react";
import { socialLinks, siteOwner } from "@/data/portfolio";

const iconMap = { Github, Linkedin, Instagram };

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span
              className="font-display text-sm font-semibold tracking-tight text-white"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              {siteOwner.name}
            </span>
            <p className="text-xs text-zinc-500">
              © {year} {siteOwner.name}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ label, href, icon }) => {
              const Icon = iconMap[icon];
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
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${siteOwner.email}`}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {siteOwner.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
