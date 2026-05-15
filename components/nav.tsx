"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hrefFor, switchLocalePath, type Locale } from "@/lib/i18n";

const links = [
  { href: "/", label: { zh: "总览", en: "Home" } },
  { href: "/library", label: { zh: "知识库", en: "Library" } },
  { href: "/institutions", label: { zh: "医院医生", en: "Care Map" } },
  { href: "/research", label: { zh: "研究进展", en: "Research" } },
  { href: "/ask", label: { zh: "智能问答", en: "Ask" } },
  { href: "/personal", label: { zh: "我的记录", en: "My Log" } },
  { href: "/sources", label: { zh: "来源", en: "Sources" } },
  { href: "/about", label: { zh: "关于", en: "About" } },
];

export default function Nav() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "zh";
  const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return (
    <nav className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href={hrefFor(locale, "/")} className="no-underline">
          <div className="font-serif text-xl font-semibold">
            角膜营养不良日志
          </div>
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">
            Corneal Dystrophy Log
          </div>
        </Link>
        <div className="grid w-full max-w-[350px] grid-cols-4 gap-2 lg:flex lg:w-auto lg:max-w-none lg:flex-wrap lg:items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={hrefFor(locale, link.href)}
              className={`focus-ring min-w-0 rounded-full border px-2 py-1.5 text-center text-sm no-underline transition hover:border-[var(--line)] hover:bg-white hover:text-[var(--text)] ${
                cleanPath === link.href
                  ? "border-[var(--accent-strong)] bg-white text-[var(--accent-strong)]"
                  : "border-transparent text-[var(--muted)]"
              }`}
            >
              {link.label[locale]}
            </Link>
          ))}
          <span className="mx-1 hidden h-6 border-l border-[var(--line)] lg:inline-block" />
          <Link
            href={switchLocalePath(pathname, "zh")}
            className={`focus-ring min-w-0 rounded-full border px-2 py-1.5 text-center text-sm no-underline ${
              locale === "zh"
                ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
                : "border-[var(--line)] bg-white text-[var(--muted)]"
            }`}
          >
            中文
          </Link>
          <Link
            href={switchLocalePath(pathname, "en")}
            className={`focus-ring min-w-0 rounded-full border px-2 py-1.5 text-center text-sm no-underline ${
              locale === "en"
                ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
                : "border-[var(--line)] bg-white text-[var(--muted)]"
            }`}
          >
            EN
          </Link>
        </div>
      </div>
    </nav>
  );
}
