import { buildMetadata } from "@/lib/meta";
import { QuoteView } from "@/views/QuoteView";

export const metadata = buildMetadata("fr", "quote", "quote");

export default function Page() {
  return <QuoteView locale="fr" />;
}
