import { site, type legal } from "@/content";
import { InfoPage } from "./InfoPage";
import { sansTitle } from "./ui";

type Doc = (typeof legal)[keyof typeof legal];

/** Privacy and terms: each section a mono label, its title and the text, split by fine rules. */
export function LegalPage({ current, doc }: { current: "privacy" | "terms"; doc: Doc }) {
  return (
    <InfoPage current={current} label={doc.label} heading={doc.heading} lede={doc.lede} note={`Effective ${doc.effective}`}>
      <ul className="divide-y divide-line border-y border-line">
        {doc.sections.map((s) => (
          <li key={s.title} className="py-7">
            <p className="mono text-muted">{s.label}</p>
            <h2 className={`${sansTitle} mt-3`}>{s.title}</h2>
            <p className="mt-2 max-w-[65ch] leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        Questions? Email <a href={`mailto:${site.email}`} className="link">{site.email}</a>
      </p>
    </InfoPage>
  );
}
