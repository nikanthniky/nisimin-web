import { ArrowDown } from "lucide-react";
import { metadata, site } from "@/lib/site";
import { products } from "@/lib/site";
import { HeroArt } from "@/components/hero-art";
import { ProductCard } from "@/components/product-card";
import { Button, Eyebrow, TextLink, ContactStrip } from "@/components/ui";
import { Reveal } from "@/components/reveal";
export const generateMetadata = () =>
  metadata(site.title, site.description, "/", { absoluteTitle: true });
const steps = [
  [
    "Understand people.",
    "Listen first. Start with the people behind the problem.",
  ],
  ["Find what matters.", "Focus on real challenges worth solving."],
  [
    "Build with intention.",
    "Make the complex feel clear, useful, and accessible.",
  ],
  ["Listen. Learn. Improve.", "Let real-world feedback shape what comes next."],
];
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-main">
          <div>
            <Eyebrow>INDEPENDENT MINDS. SHARED POSSIBILITIES.</Eyebrow>
            <h1>
              Technology that
              <br />
              moves people
              <br />
              <em>forward.</em>
            </h1>
            <p className="hero-description">
              NISIMIN creates digital products that help people connect, learn,
              organize, and grow.
            </p>
            <div className="hero-buttons">
              <Button href="/products">Explore our products</Button>
              <TextLink href="/about">Discover NISIMIN</TextLink>
            </div>
          </div>
          <HeroArt priority />
        </div>
        <div className="hero-footnote">
          <span>
            <i />
            An independent technology product company.
          </span>
          <a href="#products">
            A little progress starts here <ArrowDown size={13} />
          </a>
        </div>
      </section>
      <section className="section products-section" id="products">
        <div className="container">
          <Eyebrow>OUR PRODUCTS</Eyebrow>
          <div className="section-heading">
            <h2>
              Different challenges.
              <br />
              One commitment to progress.
            </h2>
            <TextLink href="/products">Explore our ecosystem</TextLink>
          </div>
          <Reveal className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section container philosophy">
        <div>
          <Eyebrow>THE WAY WE THINK</Eyebrow>
          <h2>
            Great technology
            <br />
            begins with
            <br />
            real problems.
          </h2>
          <p className="philosophy-intro">
            Not technology for its own sake. Thoughtful solutions that make
            everyday life a little better.
          </p>
          <TextLink href="/about">Our philosophy</TextLink>
        </div>
        <Reveal>
          <ol className="steps">
            {steps.map(([title, description], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="section vision">
        <div className="container">
          <div>
            <Eyebrow>A LONGER VIEW</Eyebrow>
            <h2>
              Built with purpose.
              <br />
              Designed for possibility.
            </h2>
            <div className="four-dots" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div>
            <p>
              We see a future where more people can participate, learn, and
              connect. Where the right tools open doors, bring communities
              together, and make room for what’s next.
            </p>
            <TextLink href="/about">The thinking behind NISIMIN</TextLink>
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
