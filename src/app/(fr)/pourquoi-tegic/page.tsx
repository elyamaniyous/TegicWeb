import { buildMetadata } from "@/lib/meta";
import { WhyView } from "@/views/WhyView";

export const metadata = buildMetadata("fr", "why", "why");

export default function Page() {
  return <WhyView locale="fr" />;
}
