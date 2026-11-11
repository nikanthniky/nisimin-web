import { metadata } from "@/lib/site";
import { Eyebrow, ContactStrip } from "@/components/ui";
import { HeroArt } from "@/components/hero-art";
export const generateMetadata = () =>
  metadata(
    "About NISIMIN",
    "We believe progress starts with people. Learn about NISIMIN’s purpose, values, and approach to thoughtful product design and engineering.",
    "/about/",
  );
const values = [
  [
    "People first",
    "Understand the people behind a problem before deciding what to build.",
  ],
  [
    "Meaningful innovation",
    "Make something useful. Let the problem guide the technology.",
  ],
  [
    "Continuous improvement",
    "Listen, learn, and make each iteration better than the last.",
  ],
  ["Reliability", "Build a foundation people can understand and depend on."],
  [
    "Accessibility",
    "Treat clarity, inclusion, and ease of use as essential design work.",
  ],
  [
    "Long-term impact",
    "Choose thoughtful progress over short-lived attention.",
  ],
];
export default function About() {
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>THIS IS NISIMIN</Eyebrow>
        <h1>
          We believe progress
          <br />
          starts with people.
        </h1>
        <p className="lead">
          We’re an emerging independent technology product brand, building
          practical digital solutions for the ways people participate, learn,
          and connect.
        </p>
      </section>
      <section className="section tinted">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>OUR PURPOSE</Eyebrow>
            <h2 style={{ marginTop: 24 }}>
              Technology with
              <br />a reason to exist.
            </h2>
          </div>
          <div>
            <p>
              Our vision is to create meaningful digital products that help
              people access opportunities, connect with communities, and achieve
              more.
            </p>
            <p>
              Our mission is to design and build accessible, reliable,
              thoughtfully engineered software that solves real-world problems.
            </p>
            <p>
              That begins with PlayTown and EduNisi: two products shaped by
              different challenges, connected by the same commitment to useful
              progress.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <Eyebrow>WHAT GUIDES US</Eyebrow>
        <div className="section-heading">
          <h2>
            A few principles.
            <br />A consistent direction.
          </h2>
        </div>
        <div className="values-grid">
          {values.map(([name, text], i) => (
            <article className="value" key={name}>
              <span>0{i + 1}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="container editorial-grid">
          <HeroArt />
          <div>
            <Eyebrow>THE WAY WE BUILD</Eyebrow>
            <h2 style={{ margin: "23px 0" }}>
              Clarity in design.
              <br />
              Care in engineering.
            </h2>
            <p>
              We start by understanding people and identifying meaningful
              problems. Then we build focused solutions, learn from real-world
              feedback, and improve continuously.
            </p>
            <p>
              Design and engineering work together: clear interfaces, accessible
              interactions, and dependable foundations all shape the experience.
              We want every product to feel considered, from the first
              interaction to the everyday details.
            </p>
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
