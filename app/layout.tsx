import type { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnalyticsEvents } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { site, absoluteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | NISIMIN",
  },
  description: site.description,
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": absoluteUrl("/#organization"),
                name: site.name,
                url: absoluteUrl("/"),
                logo: absoluteUrl("/brand/nisimin-logo.svg"),
                email: site.email,
                description: site.description,
              },
              {
                "@type": "WebSite",
                "@id": absoluteUrl("/#website"),
                name: site.name,
                url: absoluteUrl("/"),
                description: site.description,
                inLanguage: "en",
                publisher: { "@id": absoluteUrl("/#organization") },
              },
            ],
          }}
        />
        {token && /^[a-f0-9]{32}$/i.test(token) && (
          <>
            <Script
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token })}
              strategy="afterInteractive"
            />
            <AnalyticsEvents />
          </>
        )}
      </body>
    </html>
  );
}
