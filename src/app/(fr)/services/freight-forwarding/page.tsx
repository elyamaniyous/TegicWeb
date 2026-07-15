import { buildMetadata } from "@/lib/meta";
import { ServiceLightView } from "@/views/ServiceLightView";

export const metadata = buildMetadata("fr", "freightForwarding", "freightForwarding");

export default function Page() {
  return <ServiceLightView locale="fr" service="freightForwarding" />;
}
