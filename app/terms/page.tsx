import { LegalPage } from "@/components/legal-page";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Website terms — Draft",
    "Draft terms for the NISIMIN corporate website. Pending founder and legal review.",
    "/terms/",
    { index: false },
  );
export default function Terms() {
  return <LegalPage kind="terms" />;
}
