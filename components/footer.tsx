import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-[var(--muted)] md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-2 font-medium text-[var(--text)]">医学边界</p>
          <p className="leading-relaxed">
            本站是公开资料整理与个人记录工具，不构成诊断、处方或手术建议。
            眼红、畏光、视力下降、疼痛等术后警示症状应及时联系眼科医生或急诊眼科服务。
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link href="/sources" className="underline decoration-[var(--line)] underline-offset-4">
            来源与可信度
          </Link>
          <Link href="/personal" className="underline decoration-[var(--line)] underline-offset-4">
            本地私密记录
          </Link>
          <Link href="/ask" className="underline decoration-[var(--line)] underline-offset-4">
            Ask Cornea
          </Link>
        </div>
      </div>
    </footer>
  );
}
