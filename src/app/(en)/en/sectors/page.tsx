import { buildMetadata } from "@/lib/meta";
import { SectorsView } from "@/views/SectorsView";

export const metadata = buildMetadata("en", "sectors", "sectors");

export default function Page() {
  return <SectorsView locale="en" />;
}
