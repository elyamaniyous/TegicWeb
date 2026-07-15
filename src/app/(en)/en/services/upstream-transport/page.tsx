import { buildMetadata } from "@/lib/meta";
import { TransportAmontView } from "@/views/TransportAmontView";

export const metadata = buildMetadata("en", "transportAmont", "transportAmont");

export default function Page() {
  return <TransportAmontView locale="en" />;
}
