import { Suspense } from "react";
import LibraryBrowser from "@/components/library-browser";
import { getAllRecords } from "@/lib/data";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Structured records</p>
        <h1 className="text-4xl font-semibold">公共知识库</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          每条记录都带有来源、证据等级、核验日期和医学边界。这里的内容用于帮助患者和家属准备问题，
          不替代医生诊断和治疗建议。
        </p>
      </section>
      <Suspense fallback={<div className="panel p-5">加载知识库...</div>}>
        <LibraryBrowser records={getAllRecords()} />
      </Suspense>
    </div>
  );
}
