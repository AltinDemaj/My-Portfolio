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
  title: "Altin Demaj | Full-Stack & AI Engineer · React & Next.js · Ruby on Rails",
  description:
    "Altin Demaj is a full-stack and AI engineer building React, Next.js, Ruby on Rails, and AI-powered products — plus Unity and AR/VR for games and immersive work.",
  applicationName: "Altin Demaj Portfolio",
  keywords: [
    "Altin Demaj",
    "Full-Stack Developer",
    "AI Engineer",
    "AI Engineering",
    "React Developer",
    "Next.js Developer",
    "Ruby on Rails",
    "Next.js Portfolio",
    "Game Developer Kosovo",
  ],
  openGraph: {
    title: "Altin Demaj | Full-Stack & AI Engineer · React & Next.js · Ruby on Rails",
    description:
      "Portfolio of Altin Demaj — full-stack web apps, AI engineering, Ruby on Rails, Unity games, and AR/VR work.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altin Demaj | Full-Stack & AI Engineer · React & Next.js · Ruby on Rails",
    description:
      "Portfolio of Altin Demaj — full-stack web apps, AI engineering, Ruby on Rails, Unity games, and AR/VR work.",
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
