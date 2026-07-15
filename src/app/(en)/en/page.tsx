import { buildMetadata } from "@/lib/meta";
import { HomeView } from "@/views/HomeView";

export const metadata = buildMetadata("en", "home", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
