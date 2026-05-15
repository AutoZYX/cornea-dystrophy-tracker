import { SOURCES } from "@/lib/sources";

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Sources</p>
        <h1 className="text-4xl font-semibold">来源与可信度</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          本站不分发论文或指南全文，只维护可追溯的元数据、摘要和来源链接。
          高风险医疗问题请以医生意见和原始来源为准。
        </p>
      </section>
      <div className="grid gap-4">
        {SOURCES.map((source) => (
          <article key={source.id} className="panel p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{source.title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{source.publisher}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge">{source.type}</span>
                <span className="badge">证据 {source.evidence_level}</span>
                <span className="badge">{source.source_status}</span>
              </div>
            </div>
            <p className="mt-4 leading-7 text-[var(--muted)]">{source.note}</p>
            <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[var(--teal)] underline underline-offset-4">
              打开原始来源
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
