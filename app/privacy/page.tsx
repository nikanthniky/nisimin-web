import { LegalPage } from "@/components/legal-page";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Privacy notice — Draft",
    "NISIMIN’s draft corporate website privacy notice. Pending founder and legal review.",
    "/privacy/",
  );
export default function Privacy() {
  return <LegalPage kind="privacy" />;
}
