import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faizanahmed.dev"),
  title: "Faizan Ahmed — Agentic AI Engineer",
  description:
    "Faizan Ahmed — Agentic AI Engineer, ML/DL Enthusiast & Full-Stack Web Developer building intelligent autonomous systems.",
  icons: {
    icon: [
      {
        url: "/profile.jpg",
        type: "image/jpeg",
      },
    ],
    shortcut: "/profile.jpg",
    apple: "/profile.jpg",
  },
  openGraph: {
    title: "Faizan Ahmed — Agentic AI Engineer",
    description:
      "Agentic AI Engineer, ML/DL Enthusiast & Full-Stack Web Developer building intelligent autonomous systems.",
    url: "https://faizanahmed.dev",
    siteName: "Faizan Ahmed Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Faizan Ahmed Profile",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faizan Ahmed — Agentic AI Engineer",
    description:
      "Agentic AI Engineer, ML/DL Enthusiast & Full-Stack Web Developer building intelligent autonomous systems.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#05070d] text-[#e8ecf3]">
        <ParticleBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}