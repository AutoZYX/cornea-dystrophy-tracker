import { Suspense } from "react";
import LibraryBrowser from "@/components/library-browser";
import { getAllRecords } from "@/lib/data";

export default function EnglishLibraryPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Structured records</p>
        <h1 className="text-4xl font-semibold">Public Knowledge Library</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          Each record carries source links, evidence level, verification date, and medical boundary notes.
          The library helps patients and families prepare better questions; it does not replace clinical diagnosis or treatment advice.
        </p>
      </section>
      <Suspense fallback={<div className="panel p-5">Loading library...</div>}>
        <LibraryBrowser records={getAllRecords()} lang="en" />
      </Suspense>
    </div>
  );
}
