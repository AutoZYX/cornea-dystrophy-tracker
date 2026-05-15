import RecordCard from "@/components/record-card";
import { getRecordsByCategory } from "@/lib/data";

export default function ResearchPage() {
  const records = getRecordsByCategory("research");
  const treatments = getRecordsByCategory("treatment").filter((record) =>
    record.tags.some((tag) => ["GEB-101", "DMEK", "PTK", "DALK", "PK"].includes(tag))
  );
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Research watch</p>
        <h1 className="text-4xl font-semibold">研究进展与治疗路径</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          前沿进展最容易被误读。本页明确区分常规治疗、医生确认项和研究探索项。
          单例报道、公司新闻和临床研究信息不能直接转化为个人治疗方案。
        </p>
      </section>

      <section className="grid gap-4">
        {records.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-semibold">相关治疗条目</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {treatments.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>
    </div>
  );
}
