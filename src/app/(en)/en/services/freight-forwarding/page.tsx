import { buildMetadata } from "@/lib/meta";
import { ServiceLightView } from "@/views/ServiceLightView";

export const metadata = buildMetadata("en", "freightForwarding", "freightForwarding");

export default function Page() {
  return <ServiceLightView locale="en" service="freightForwarding" />;
}
