import type { Metadata } from "next";
export const site = {
  name: "NISIMIN",
  url: "https://nisimin.com",
  email: "hello@nisimin.com",
  title: "NISIMIN | Technology for Sports and Education",
  description:
    "NISIMIN builds technology products for sports communities and education, including PlayTown and EduNisi.",
};
export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).href;
}
export function metadata(
  title: string,
  description: string,
  path: string,
  { absoluteTitle = false, index = true } = {},
): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/brand/social.png",
          width: 1200,
          height: 630,
          alt: "NISIMIN — Technology that moves people forward.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/brand/social.png"],
    },
  };
}
export const products = [
  {
    slug: "playtown",
    name: "PlayTown",
    category: "SPORTS & COMMUNITY",
    status: "Preparing for launch",
    description: "More than a game. A community.",
    detail:
      "Connecting athletes, clubs, teams, and tournament organizers. Bringing local sporting communities closer together.",
    color: "orange",
  },
  {
    slug: "edunisi",
    name: "EduNisi",
    category: "EDUCATION & INSTITUTIONS",
    status: "In development",
    description: "Less administration. More education.",
    detail:
      "Thoughtfully designed to simplify attendance, academic administration, and communication for educational institutions.",
    color: "blue",
  },
] as const;
