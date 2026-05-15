"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hrefFor, type Locale } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "zh";

  return (
    <footer className="mt-10 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-[var(--muted)] md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-2 font-medium text-[var(--text)]">
            {locale === "zh" ? "医学边界" : "Medical Boundary"}
          </p>
          <p className="leading-relaxed">
            {locale === "zh"
              ? "本站由张玉新个人制作和维护，是公开资料整理与个人记录工具，不构成诊断、处方或手术建议。眼红、畏光、视力下降、疼痛等术后警示症状应及时联系眼科医生或急诊眼科服务。本站无商业目的。"
              : "This non-commercial site is personally built and maintained by Yuxin Zhang as a public information and private logging tool. It is not diagnosis, prescription, or surgical advice. Redness, light sensitivity, vision loss, or pain after transplant should be escalated to an ophthalmologist or emergency eye service."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link href={hrefFor(locale, "/sources")} className="underline decoration-[var(--line)] underline-offset-4">
            {locale === "zh" ? "来源与可信度" : "Sources"}
          </Link>
          <Link href={hrefFor(locale, "/personal")} className="underline decoration-[var(--line)] underline-offset-4">
            {locale === "zh" ? "本地私密记录" : "Private Local Log"}
          </Link>
          <Link href={hrefFor(locale, "/ask")} className="underline decoration-[var(--line)] underline-offset-4">
            Ask Cornea
          </Link>
          <Link href={hrefFor(locale, "/about")} className="underline decoration-[var(--line)] underline-offset-4">
            {locale === "zh" ? "关于本站" : "About"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
