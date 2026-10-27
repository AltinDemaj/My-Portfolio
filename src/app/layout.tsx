import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Altin Demaj | Full-Stack Developer · React & Next.js · Ruby on Rails",
  description:
    "Altin Demaj is a full-stack developer building React, Next.js, and Ruby on Rails products — with AI-assisted workflows, plus Unity and AR/VR for games and immersive work.",
  applicationName: "Altin Demaj Portfolio",
  keywords: [
    "Altin Demaj",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Ruby on Rails",
    "Next.js Portfolio",
    "Game Developer Kosovo",
  ],
  openGraph: {
    title: "Altin Demaj | Full-Stack Developer · React & Next.js · Ruby on Rails",
    description:
      "Portfolio of Altin Demaj — full-stack web apps, Ruby on Rails, AI-assisted delivery, Unity games, and AR/VR work.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altin Demaj | Full-Stack Developer · React & Next.js · Ruby on Rails",
    description:
      "Portfolio of Altin Demaj — full-stack web apps, Ruby on Rails, AI-assisted delivery, Unity games, and AR/VR work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} min-h-screen antialiased bg-[#0a0a0a] text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
