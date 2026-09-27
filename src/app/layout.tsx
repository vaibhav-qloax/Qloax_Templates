import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import InitialVideoSplash from "@/components/shared/InitialVideoSplash";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "QLOAX — Engineering Intelligence, Empowering Industry",
  description:
    "QLOAX combines domain expertise with next-generation technology to build intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <body className="antialiased bg-[#030303] text-white font-sans selection:bg-[#C40024] selection:text-white">
        <InitialVideoSplash />
        {children}
      </body>
    </html>
  );
}
