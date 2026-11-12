import { ProductPage } from "@/components/product-page";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "PlayTown — Community Sports Platform",
    "Meet PlayTown, a sports community platform preparing to connect athletes, clubs, teams, and tournament organizers. Preparing for launch.",
    "/products/playtown/",
  );
export default function PlayTown() {
  return <ProductPage slug="playtown" />;
}
