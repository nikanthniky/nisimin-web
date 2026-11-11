import { metadata, products } from "@/lib/site";
import { Eyebrow, ContactStrip } from "@/components/ui";
import { ProductCard } from "@/components/product-card";
export const generateMetadata = () =>
  metadata(
    "Our products",
    "Meet PlayTown and EduNisi: focused digital products for sports communities and educational institutions.",
    "/products/",
  );
export default function Products() {
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>THE NISIMIN ECOSYSTEM</Eyebrow>
        <h1>
          Different challenges.
          <br />
          One commitment to progress.
        </h1>
        <p className="lead">
          Two distinct products. One shared belief: thoughtful technology can
          make everyday life better.
        </p>
      </section>
      <section className="section products-section">
        <div className="container product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <section className="section container editorial-grid">
        <h2>
          Focused products.
          <br />A shared foundation.
        </h2>
        <div>
          <p>
            From a local playing field to an institution’s daily operations,
            every context deserves its own approach. We’re building PlayTown and
            EduNisi around the people who will use them.
          </p>
          <p>
            Both products are under active preparation or development. Explore
            their pages to understand their intended direction and current
            status.
          </p>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
