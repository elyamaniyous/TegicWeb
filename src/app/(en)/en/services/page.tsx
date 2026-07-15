import { buildMetadata } from "@/lib/meta";
import { ServicesHubView } from "@/views/ServicesHubView";

export const metadata = buildMetadata("en", "services", "services");

export default function Page() {
  return <ServicesHubView locale="en" />;
}
