import type { Metadata } from "next";
export const site = {
  name: "NISIMIN",
  url: "https://nisimin.com",
  email: "hello@nisimin.com",
};
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | NISIMIN`,
      description,
      url: path,
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
      title: `${title} | NISIMIN`,
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
