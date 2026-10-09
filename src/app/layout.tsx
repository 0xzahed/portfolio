import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { Grain } from "@/components/ui/Grain";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { SiteField } from "@/components/ui/SiteField";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { person, site, socials } from "@/data/portfolio";
import portrait from "@/assets/zahed-portrait.webp";

// Self-hosted variable fonts (SIL OFL). Archivo carries both weight and width axes.
const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const geist = localFont({ src: "../fonts/Geist-Variable.woff2", variable: "--font-geist", weight: "100 900", display: "swap" });
const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${person.name} (${person.handle})` },
  description: site.description,
  applicationName: `${person.name} — Portfolio`,
  keywords: site.keywords,
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: `${person.name} (${person.handle})`,
    title: site.title,
    description: site.description,
    locale: site.locale,
    firstName: person.name,
    username: person.handle,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(site.twitterHandle ? { creator: site.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Google Search Console: set GOOGLE_SITE_VERIFICATION on Vercel to the token it gives you.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

// Structured data: tells search engines who this site is about, in their own vocabulary.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: person.name,
      alternateName: person.handle,
      jobTitle: person.role,
      description: site.description,
      url: site.url,
      image: `${site.url}${portrait.src}`,
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      knowsAbout: site.expertise,
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${person.name} (${person.handle})`,
      description: site.description,
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable} antialiased`}
      style={{ backgroundColor: "#050505", colorScheme: "dark" }}
    >
      <body style={{ backgroundColor: "#050505", color: "#f2f2ee" }}>
        <noscript>
          <style>{`#preloader{display:none!important}.js-reveal{opacity:1!important;transform:none!important}.reveal-media,[data-reveal],.s-in,.s-bar,.s-grow,.s-pop{opacity:1!important;translate:none!important;scale:none!important}.story-section{height:auto!important}.story-sticky{position:static!important;height:auto!important;padding-block:5rem!important}.story-stack{display:flex!important;flex-direction:column;gap:5rem}.story-step{visibility:visible!important;grid-area:auto!important}.story-label{transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[110] bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <IntroProvider>
          <MotionProvider>
            <SmoothScroll>
              <Preloader />
              <SiteField />
              <ScrollProgress />
              <Nav />
              <main id="main" className="relative">{children}</main>
              <Footer />
              <Cursor />
              <Grain />
              <RevealObserver />
            </SmoothScroll>
          </MotionProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
