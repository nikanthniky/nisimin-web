import { GraduationCap, MoveUpRight } from "lucide-react";
import { Button, Eyebrow, ContactStrip } from "./ui";
import { products } from "@/lib/site";
const content = {
  playtown: {
    heading: "Your game.\nYour people.\nYour PlayTown.",
    intro:
      "Local sport has the power to bring people together. PlayTown is a sports community platform preparing to help athletes, clubs, teams, and tournament organizers become more visible and connected.",
    problem: "Local talent deserves a stronger connection.",
    context:
      "Finding a team, discovering a tournament, or making a club visible can mean navigating scattered information and disconnected networks. PlayTown’s direction starts with these everyday challenges.",
    topics: [
      [
        "For athletes",
        "A place intended to help athletes express their sporting identity, find communities, and explore opportunities to participate.",
      ],
      [
        "For clubs and teams",
        "A more connected space for local clubs and teams to become discoverable and build their community.",
      ],
      [
        "For tournament organizers",
        "An intended way to make local tournaments easier to discover and help interested participants find relevant opportunities.",
      ],
      [
        "For the love of participation",
        "The goal is simple: help more people find their way into sport and stay connected to the people who make it meaningful.",
      ],
    ],
    status: "Preparing for launch",
    statusText:
      "PlayTown is preparing for launch. The areas described here communicate the product’s intended direction, rather than a guarantee of currently available features. Public access and a launch date have not been announced.",
    cta: "Ask about PlayTown",
    subject: "PlayTown enquiry",
  },
  edunisi: {
    heading: "More clarity.\nMore connection.\nMore room to learn.",
    intro:
      "EduNisi is an education management platform in development, focused on simplifying the work behind education so institutions can give more attention to learning.",
    problem: "Education works better when everyday work flows.",
    context:
      "Attendance records, departmental coordination, and institutional communication can become fragmented. EduNisi is being designed around these practical administrative challenges.",
    topics: [
      [
        "Attendance management",
        "Planned tools to help institutions organize attendance information and reduce repetitive record keeping.",
      ],
      [
        "Academic administration",
        "A planned foundation for organizing academic information and simplifying everyday administrative work.",
      ],
      [
        "Department management",
        "An intended way to support clearer coordination and information organization across institutional departments.",
      ],
      [
        "Institutional communication",
        "Planned communication tools to help the right information reach the right people within an institution.",
      ],
    ],
    status: "In development",
    statusText:
      "EduNisi is in development. All capabilities described on this page are planned areas of focus, not a statement of deployed functionality. Availability, feature scope, and timelines are not yet confirmed. Intended users include institutional administrators, department teams, and educators.",
    cta: "Enquire about a future demo",
    subject: "EduNisi demo enquiry",
  },
};
export function ProductPage({ slug }: { slug: "playtown" | "edunisi" }) {
  const p = products.find((p) => p.slug === slug)!;
  const c = content[slug];
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>A PRODUCT BY NISIMIN · {p.category}</Eyebrow>
        <h1>
          {c.heading.split("\n").map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
        <p className="lead">{c.intro}</p>
        <div className="status">
          <i />
          {c.status}
        </div>
        <br />
        <Button
          href={`mailto:hello@nisimin.com?subject=${encodeURIComponent(c.subject)}`}
        >
          {c.cta}
        </Button>
      </section>
      <div className="container">
        <div
          className={`detail-banner ${p.color}`}
          aria-label={`${p.name} brand illustration`}
          role="img"
        >
          <div className="art-grid" />
          {slug === "playtown" ? (
            <>
              <div className="court">
                <div className="court-circle" />
                <div className="court-line" />
              </div>
              <div className="product-art-word">
                Play<span>Town</span>
                <MoveUpRight />
              </div>
            </>
          ) : (
            <>
              <div className="education-orbits">
                <div />
                <div />
                <div />
              </div>
              <div className="product-art-word edu">
                <GraduationCap />
                EduNisi
              </div>
            </>
          )}
          <span className="art-caption">A PRODUCT BY NISIMIN</span>
        </div>
      </div>
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>BUILT AROUND REAL PEOPLE</Eyebrow>
          <h2 style={{ marginTop: 24 }}>{c.problem}</h2>
        </div>
        <div>
          <p>{c.context}</p>
          <div className="topic-list">
            {c.topics.map(([title, text]) => (
              <article key={title} className="topic">
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container editorial-grid">
          <h2>
            Thoughtful progress.
            <br />
            Clear expectations.
          </h2>
          <div>
            <p>
              Useful products take listening, testing, and continuous
              improvement. We’re taking that work seriously.
            </p>
            <div className="status-panel">
              <h3>{c.status}</h3>
              <p>{c.statusText}</p>
            </div>
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
