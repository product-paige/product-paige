import { audiences } from "@/content";
import { CardMat } from "./CardMat";

/** Who I work with: who it's for and one statement per card, on the cutting mat (audiences in content.ts). */
export function WhoIWorkWith() {
  return <CardMat eyebrow={audiences.eyebrow} heading={audiences.heading} items={audiences.items.map((a) => ({ label: a.title, title: a.body }))} />;
}
