import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "secondary" : ""}`}
      data-track={
        href.startsWith("mailto:")
          ? "contact_email"
          : href.includes("playtown")
            ? "playtown_cta"
            : href.includes("edunisi")
              ? "edunisi_cta"
              : undefined
      }
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="container contact-inner">
        <div>
          <Eyebrow>GOOD THINGS START WITH A CONVERSATION</Eyebrow>
          <h2>
            Let’s build a more
            <br />
            connected future.
          </h2>
        </div>
        <a
          href="mailto:hello@nisimin.com"
          className="email-link"
          data-track="contact_email"
        >
          hello@nisimin.com
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
