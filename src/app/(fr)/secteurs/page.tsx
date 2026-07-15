import { buildMetadata } from "@/lib/meta";
import { SectorsView } from "@/views/SectorsView";

export const metadata = buildMetadata("fr", "sectors", "sectors");

export default function Page() {
  return <SectorsView locale="fr" />;
}
