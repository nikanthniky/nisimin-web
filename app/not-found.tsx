import { Button } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page could not be found. Explore NISIMIN and its products.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="not-found container">
      <p>404 · A DIFFERENT PATH</p>
      <h1>
        Let’s get you
        <br />
        moving again.
      </h1>
      <p>This page couldn’t be found.</p>
      <Button href="/">Back to NISIMIN</Button>
    </section>
  );
}
