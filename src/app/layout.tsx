import type { Metadata } from "next";
import "./globals.css";
import InitialVideoSplash from "@/components/shared/InitialVideoSplash";

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
    <html lang="en" className="dark">
      <body className="antialiased bg-[#030303] text-white">
        <InitialVideoSplash />
        {children}
      </body>
    </html>
  );
}
