import type { Metadata } from "next";
import { Fraunces, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/shared/LenisProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomCursor from "@/components/shared/CustomCursor";

// 移除繁體中文字型 Noto_Serif_TC / Noto_Sans_TC
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://replai-web.vercel.app";
const SITE_DESC =
  "Replai provides AI auto-reply & auto-booking systems for SMEs and solo entrepreneurs. Integrate Facebook, Instagram & LINE to never miss customer messages 24/7 and retain more clients.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Replai — AI Auto Reply & Booking Bot | Facebook・Instagram・LINE Customer Service Automation",
    template: "%s | Replai",
  },
  description: SITE_DESC,
  keywords: [
    "AI auto reply",
    "AI customer service",
    "auto booking system",
    "Facebook auto reply",
    "Instagram auto reply",
    "LINE chatbot",
    "chatbot",
    "solo entrepreneur",
    "nail salon booking system",
    "Taiwan AI customer service",
    "Replai",
  ],
  authors: [{ name: "Replai" }],
  creator: "Replai",
  publisher: "Replai",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Replai",
    title: "Replai — AI Auto Reply, Never Miss A Message",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "Replai — AI Auto Reply, Never Miss A Message",
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  verification: {
    google: "erYbhJgHwHE5iKKzGAlXGP3PQ_encw7EbElpV1WaONg",
  },
};

// Structured data (JSON-LD) fully translated to English
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Replai",
      url: SITE_URL,
      description: SITE_DESC,
      sameAs: ["https://linktr.ee/replai"],
      areaServed: { "@type": "Country", name: "Taiwan" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Replai",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      name: "AI Customer Auto-Reply & Auto Booking System",
      serviceType: "AI Customer Service Automation",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Taiwan" },
      description:
        "AI auto-reply and auto-booking system integrated with Facebook, Instagram & LINE, capture customer inquiries 24 hours a day.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}