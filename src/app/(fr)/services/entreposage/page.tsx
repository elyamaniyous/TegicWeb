import { buildMetadata } from "@/lib/meta";
import { ServiceLightView } from "@/views/ServiceLightView";

export const metadata = buildMetadata("fr", "entreposage", "entreposage");

export default function Page() {
  return <ServiceLightView locale="fr" service="entreposage" />;
}
