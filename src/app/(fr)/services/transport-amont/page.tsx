import { buildMetadata } from "@/lib/meta";
import { TransportAmontView } from "@/views/TransportAmontView";

export const metadata = buildMetadata("fr", "transportAmont", "transportAmont");

export default function Page() {
  return <TransportAmontView locale="fr" />;
}
