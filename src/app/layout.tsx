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
  title: "Altin Demaj | Unity Developer, AR/VR Developer, Full-Stack Developer",
  description:
    "Altin Demaj is a Unity Developer, AR/VR Developer, and Full-Stack Developer building games, immersive experiences, and modern web platforms from concept to launch.",
  applicationName: "Altin Demaj Portfolio",
  keywords: [
    "Altin Demaj",
    "Unity Developer",
    "AR/VR Developer",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "Game Developer Kosovo",
  ],
  openGraph: {
    title: "Altin Demaj | Unity Developer, AR/VR Developer, Full-Stack Developer",
    description:
      "Portfolio of Altin Demaj featuring Unity games, AR/VR concepts, full-stack web apps, and interactive demos.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altin Demaj | Unity Developer, AR/VR Developer, Full-Stack Developer",
    description:
      "Portfolio of Altin Demaj featuring Unity games, AR/VR concepts, full-stack web apps, and interactive demos.",
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
