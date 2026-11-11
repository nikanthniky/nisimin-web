import { ProductPage } from "@/components/product-page";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "EduNisi — Education & Institutions",
    "EduNisi is an education management platform in development, focused on attendance, academic administration, and institutional communication.",
    "/products/edunisi/",
  );
export default function EduNisi() {
  return <ProductPage slug="edunisi" />;
}
