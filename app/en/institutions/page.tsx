import InstitutionList from "@/components/institution-list";
import { INSTITUTIONS } from "@/lib/data";

export default function EnglishInstitutionsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Institutions and clinicians</p>
        <h1 className="text-4xl font-semibold">Hospital and Clinician Map</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          China first, international references second. This is not a ranking or appointment guide; it is a source-backed map of care nodes related to corneal disease, transplantation, endothelial surgery, gene-therapy research, and childhood follow-up.
        </p>
      </section>
      <InstitutionList institutions={INSTITUTIONS} lang="en" />
    </div>
  );
}
