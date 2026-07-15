import { buildMetadata } from "@/lib/meta";
import { WhyView } from "@/views/WhyView";

export const metadata = buildMetadata("en", "why", "why");

export default function Page() {
  return <WhyView locale="en" />;
}
