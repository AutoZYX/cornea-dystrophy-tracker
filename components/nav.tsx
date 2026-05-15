import Link from "next/link";

const links = [
  { href: "/", label: "总览" },
  { href: "/library", label: "知识库" },
  { href: "/institutions", label: "医院医生" },
  { href: "/research", label: "研究进展" },
  { href: "/ask", label: "智能问答" },
  { href: "/personal", label: "我的记录" },
  { href: "/sources", label: "来源" },
];

export default function Nav() {
  return (
    <nav className="border-b border-[var(--line)] bg-[rgba(247,245,239,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="no-underline">
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">
            Cornea Dystrophy Log
          </div>
          <div className="font-serif text-xl font-semibold">角膜营养不良观察手册</div>
        </Link>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full border border-transparent px-3 py-1.5 text-sm text-[var(--muted)] no-underline transition hover:border-[var(--line)] hover:bg-white hover:text-[var(--text)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
