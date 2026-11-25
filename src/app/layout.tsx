import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { CONTACT, SITE } from "@/content/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f2",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s · QLOAX" },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "QLOAX",
    title: SITE.title,
    description: SITE.description,
    url: "/",
    images: [{ url: "/brand/fig-01-lattice.jpg", width: 2765, height: 1556, alt: "QLOAX" }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QLOAX",
  url: SITE.url,
  logo: `${SITE.url}/brand/qloax-logo.png`,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  slogan: SITE.motto,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
