import InstitutionList from "@/components/institution-list";
import { INSTITUTIONS } from "@/lib/data";

export default function InstitutionsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Institutions and clinicians</p>
        <h1 className="text-4xl font-semibold">医院医生追踪</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          国内优先，国外作为参考。这里不是排名，也不是挂号建议，而是把公开资料中与角膜病、
          角膜移植、内皮移植、基因治疗和儿童随访相关的节点整理出来。
        </p>
      </section>
      <InstitutionList institutions={INSTITUTIONS} />
    </div>
  );
}
