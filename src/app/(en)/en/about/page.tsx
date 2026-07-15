import { buildMetadata } from "@/lib/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = buildMetadata("en", "about", "about");

export default function Page() {
  return <AboutView locale="en" />;
}
