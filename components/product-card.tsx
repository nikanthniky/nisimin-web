import { ArrowUpRight, MoveUpRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/site";
export function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  const play = product.slug === "playtown";
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card ${product.color}`}
      data-track={`${product.slug}_cta`}
    >
      <div className="product-art" aria-hidden="true">
        <div className="art-grid" />
        {play ? (
          <>
            <div className="court">
              <div className="court-circle" />
              <div className="court-line" />
              <div className="court-key" />
            </div>
            <div className="product-art-word">
              Play<span>Town</span>
              <MoveUpRight strokeWidth={3} />
            </div>
            <span className="art-caption">
              FIND YOUR GAME. FIND YOUR PEOPLE.
            </span>
          </>
        ) : (
          <>
            <div className="education-orbits">
              <div />
              <div />
              <div />
            </div>
            <div className="product-art-word edu">
              <GraduationCap strokeWidth={1.8} />
              EduNisi
            </div>
            <span className="art-caption">MORE SPACE FOR WHAT MATTERS.</span>
          </>
        )}
        <span className="product-art-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="status">
            <i />
            {product.status}
          </span>
        </div>
        <h3>{product.description}</h3>
        <p>{product.detail}</p>
        <span className="text-link">
          Discover {product.name}
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
