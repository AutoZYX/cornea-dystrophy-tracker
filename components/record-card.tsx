import { getSourceById } from "@/lib/sources";
import { CATEGORY_LABELS } from "@/lib/data";
import { CATEGORY_LABELS_EN, type Locale } from "@/lib/i18n";
import type { KnowledgeRecord } from "@/lib/types";

export default function RecordCard({
  record,
  lang = "zh",
}: {
  record: KnowledgeRecord;
  lang?: Locale;
}) {
  const sources = record.source_ids
    .map(getSourceById)
    .filter((source): source is NonNullable<typeof source> => Boolean(source));
  const isEn = lang === "en";
  const title = isEn ? record.title_en ?? record.title : record.title;
  const summary = isEn ? record.summary_en ?? record.summary : record.summary;
  const keyPoints = isEn ? record.key_points_en ?? record.key_points : record.key_points;
  const limits =
    isEn
      ? record.limits_en ?? record.limits ?? ["Confirm diagnosis and treatment with a cornea specialist."]
      : record.limits?.length
        ? record.limits
        : ["具体诊断和治疗方案需由角膜专科医生确认。"];
  const tags = isEn ? record.tags_en ?? record.tags : record.tags;

  return (
    <article className="panel p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="badge">{isEn ? CATEGORY_LABELS_EN[record.category] : CATEGORY_LABELS[record.category]}</span>
        <span className="badge">{isEn ? "Evidence" : "证据"} {record.evidence_level}</span>
        <span className="badge">{record.medical_caveat}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-[var(--muted)]">{summary}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-[var(--green)]">{isEn ? "Key Points" : "要点"}</p>
          <ul className="space-y-2 text-sm leading-6 text-[var(--text)]">
            {keyPoints.slice(0, 4).map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-[var(--coral)]">{isEn ? "Limits" : "边界"}</p>
          <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
            {limits.slice(0, 3).map((limit) => (
              <li key={limit}>• {limit}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded border border-[var(--line)] px-2 py-1 text-xs text-[var(--muted)]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 border-t border-[var(--line)] pt-3 text-xs leading-5 text-[var(--muted)]">
        {isEn ? "Sources: " : "来源："}
        {sources.map((source, index) => (
          <span key={source.id}>
            {index > 0 ? "；" : ""}
            <a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              {source.publisher}
            </a>
          </span>
        ))}
      </div>
    </article>
  );
}
