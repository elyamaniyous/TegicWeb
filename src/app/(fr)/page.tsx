import { buildMetadata } from "@/lib/meta";
import { HomeView } from "@/views/HomeView";

export const metadata = buildMetadata("fr", "home", "home");

export default function Page() {
  return <HomeView locale="fr" />;
}
