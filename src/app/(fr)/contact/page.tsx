import { buildMetadata } from "@/lib/meta";
import { ContactView } from "@/views/ContactView";

export const metadata = buildMetadata("fr", "contact", "contact");

export default function Page() {
  return <ContactView locale="fr" />;
}
