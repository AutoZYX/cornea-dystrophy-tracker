import RecordCard from "@/components/record-card";
import { getRecordsByCategory } from "@/lib/data";

export default function EnglishResearchPage() {
  const records = getRecordsByCategory("research");
  const treatments = getRecordsByCategory("treatment").filter((record) =>
    record.tags.some((tag) => ["GEB-101", "DMEK", "PTK", "DALK", "PK"].includes(tag))
  );
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Research watch</p>
        <h1 className="text-4xl font-semibold">Research Watch and Treatment Pathways</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          Frontier progress is easy to overread. This page separates routine treatment, clinician-confirmed decisions, and research-only signals.
        </p>
      </section>

      <section className="grid gap-4">
        {records.map((record) => (
          <RecordCard key={record.id} record={record} lang="en" />
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-semibold">Related Treatment Notes</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {treatments.map((record) => (
            <RecordCard key={record.id} record={record} lang="en" />
          ))}
        </div>
      </section>
    </div>
  );
}
