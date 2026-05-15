import Link from "next/link";
import { CATEGORY_LABELS, INSTITUTIONS, KNOWLEDGE_RECORDS } from "@/lib/data";
import type { DashboardStats } from "@/lib/types";
import StatCard from "./stat-card";
import RecordCard from "./record-card";

export default function HomeDashboard({ stats }: { stats: DashboardStats }) {
  const redFlag = KNOWLEDGE_RECORDS.find((record) => record.id === "CD-CARE-RED-FLAGS");
  const featured = KNOWLEDGE_RECORDS.filter((record) =>
    ["CD-OVERVIEW-001", "CD-GENE-TGFBI", "CD-TX-PK", "CD-RSCH-GEB101"].includes(record.id)
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="py-4">
          <p className="mb-4 max-w-full break-words text-xs uppercase tracking-[0.12em] text-[var(--teal)] md:text-sm md:tracking-[0.22em]">
            Public knowledge base + private local log
          </p>
          <h1 className="max-w-3xl text-[2.25rem] font-semibold leading-tight md:text-6xl">
            把角膜营养不良，从一次次问诊，整理成可追踪的知识系统。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            这里汇总疾病分型、遗传机制、治疗路径、医院医生、前沿研究和术后护理。
            个人和家族病史只保存在你的浏览器本地，可导出，不默认上传。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/library" className="focus-ring rounded bg-[var(--teal)] px-4 py-2 text-white no-underline">
              浏览知识库
            </Link>
            <Link href="/personal" className="focus-ring rounded border border-[var(--teal)] px-4 py-2 text-[var(--teal)] no-underline">
              建立我的记录
            </Link>
            <Link href="/ask" className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-2 no-underline">
              智能问答
            </Link>
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">角膜层次与治疗坐标</h2>
            <span className="badge">先定位层次，再谈治疗</span>
          </div>
          <div className="overflow-hidden rounded-[999px] border border-[var(--line)] bg-white">
            <div className="cornea-layer bg-[#e9f7f5]">
              <span>上皮 / 基底膜</span>
              <span className="text-[var(--muted)]">糜烂、疼痛、表面不规则</span>
            </div>
            <div className="cornea-layer bg-[#f2f8e8]">
              <span>Bowman 层 / 前基质</span>
              <span className="text-[var(--muted)]">PTK、表浅沉积</span>
            </div>
            <div className="cornea-layer bg-[#fff5df]">
              <span>基质</span>
              <span className="text-[var(--muted)]">DALK / PK / 散光</span>
            </div>
            <div className="cornea-layer bg-[#fbe9e2]">
              <span>Descemet 膜 / 内皮</span>
              <span className="text-[var(--muted)]">DMEK / DSEK / 水肿</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            同样是“角膜营养不良”，受累层次不同，复发风险、手术方式和术后记录重点都会变。
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <StatCard label="知识记录" value={stats.totalRecords} tone="teal" />
        <StatCard label="权威来源" value={stats.sourceCount} tone="green" />
        <StatCard label="医院节点" value={stats.institutionCount} tone="blue" />
        <StatCard label="治疗条目" value={stats.treatmentCount} tone="coral" />
        <StatCard label="最新核验" value={stats.latestVerifiedAt} tone="amber" />
      </section>

      {redFlag ? (
        <section className="border-l-4 border-[var(--coral)] bg-white p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--coral)]">术后红旗症状</p>
          <h2 className="mt-2 text-2xl font-semibold">{redFlag.title}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">{redFlag.summary}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {["眼红", "畏光", "视力下降", "疼痛"].map((item) => (
              <div key={item} className="rounded border border-[var(--line)] bg-[#fff8f5] p-3 text-center font-medium">
                {item}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Knowledge backbone</p>
            <h2 className="text-3xl font-semibold">第一批核心记录</h2>
          </div>
          <Link href="/library" className="text-sm text-[var(--teal)] underline underline-offset-4">
            查看全部分类
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">China first, global reference</p>
            <h2 className="text-3xl font-semibold">国内优先的医院医生索引</h2>
          </div>
          <Link href="/institutions" className="text-sm text-[var(--teal)] underline underline-offset-4">
            打开医院医生页
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {INSTITUTIONS.slice(0, 8).map((item) => (
            <div key={item.id} className="rounded border border-[var(--line)] bg-white p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {item.city} · {item.country}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.why_it_matters}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link href="/ask" className="panel block p-5 no-underline transition hover:border-[var(--teal)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Ask Cornea</p>
          <h2 className="mt-2 text-2xl font-semibold">带引用的智能问答</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            基于公开知识库回答，自动返回记录 ID 和来源链接。不诊断，不替代医生。
          </p>
        </Link>
        <Link href="/personal" className="panel block p-5 no-underline transition hover:border-[var(--teal)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--green)]">Local private log</p>
          <h2 className="mt-2 text-2xl font-semibold">本地私密登记</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            家族史、下一步动作和术后复查记录默认只保存在你的浏览器，可导出 JSON 和复诊摘要。
          </p>
        </Link>
      </section>

      <section className="panel p-5">
        <h2 className="text-2xl font-semibold">分类覆盖</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(stats.categoryCounts)
            .filter(([, count]) => count > 0)
            .map(([category, count]) => (
              <Link
                key={category}
                href={`/library?category=${category}`}
                className="flex items-center justify-between rounded border border-[var(--line)] bg-white px-3 py-2 text-sm no-underline"
              >
                <span>{CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}</span>
                <span className="text-[var(--muted)]">{count}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
