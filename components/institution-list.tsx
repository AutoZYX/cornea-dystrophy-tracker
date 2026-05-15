import { getSourceById } from "@/lib/sources";
import type { InstitutionRecord } from "@/lib/types";

export default function InstitutionList({ institutions }: { institutions: InstitutionRecord[] }) {
  return (
    <div className="grid gap-4">
      {institutions.map((institution) => {
        const sources = institution.source_ids
          .map(getSourceById)
          .filter((source): source is NonNullable<typeof source> => Boolean(source));
        return (
          <article key={institution.id} className="panel p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{institution.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {institution.city} · {institution.country} · 证据 {institution.evidence_level}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {institution.focus.map((focus) => (
                  <span key={focus} className="badge">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <p className="leading-7 text-[var(--text)]">{institution.why_it_matters}</p>
              <p className="leading-7 text-[var(--muted)]">{institution.public_note}</p>
            </div>
            <div className="mt-4 border-t border-[var(--line)] pt-3 text-sm text-[var(--muted)]">
              来源：
              {sources.map((source, index) => (
                <span key={source.id}>
                  {index > 0 ? "；" : ""}
                  <a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {source.publisher}
                  </a>
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
