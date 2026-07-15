import { buildMetadata } from "@/lib/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = buildMetadata("fr", "about", "about");

export default function Page() {
  return <AboutView locale="fr" />;
}
