import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { Grain } from "@/components/ui/Grain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { person, site, socials } from "@/data/portfolio";

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
  title: { default: site.title, template: `%s — ${person.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: person.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, creator: site.twitterHandle },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
      <body>
        <noscript>
          <style>{`#preloader{display:none!important}.js-reveal{opacity:1!important;transform:none!important}`}</style>
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
              <ScrollProgress />
              <Nav />
              <main id="main">{children}</main>
              <Footer />
              <Cursor />
              <Grain />
            </SmoothScroll>
          </MotionProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
