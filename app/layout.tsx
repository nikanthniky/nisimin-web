import type { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnalyticsEvents } from "@/components/analytics";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://nisimin.com"),
  title: {
    default: "NISIMIN — Technology that moves people forward.",
    template: "%s | NISIMIN",
  },
  description:
    "NISIMIN creates digital products that help people connect, learn, organize, and grow.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NISIMIN",
              url: "https://nisimin.com",
              logo: "https://nisimin.com/brand/nisimin-logo.svg",
              email: "hello@nisimin.com",
              description: "An emerging independent technology product brand.",
            }),
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
