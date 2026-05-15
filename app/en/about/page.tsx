export default function EnglishAboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="panel p-6">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">About</p>
        <h1 className="text-4xl font-semibold">Why This Platform Exists</h1>
        <p className="mt-5 leading-8 text-[var(--muted)]">
          Corneal dystrophies are uncommon inherited eye diseases that can shape long-term family life. Patients often face fragmented terminology, scattered treatment pathways, and family histories that are difficult to track over decades. This platform separates public knowledge from private records: the former is searchable, cited, and answerable; the latter stays local by default.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">Evidence Chain</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Each public record carries sources, evidence level, verification date, and medical boundary notes.
          </p>
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">Local by Default</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            The private log uses browser local storage and export tools to avoid silently hosting sensitive health data.
          </p>
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">No Diagnosis</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            AI answers explain the public knowledge base. They do not prescribe or choose surgery for an individual patient.
          </p>
        </div>
      </section>
    </div>
  );
}
