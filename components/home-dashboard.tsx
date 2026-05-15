import Link from "next/link";
import { CATEGORY_LABELS, INSTITUTIONS, KNOWLEDGE_RECORDS } from "@/lib/data";
import { CATEGORY_LABELS_EN, hrefFor, type Locale } from "@/lib/i18n";
import type { DashboardStats } from "@/lib/types";
import StatCard from "./stat-card";
import RecordCard from "./record-card";

export default function HomeDashboard({
  stats,
  lang = "zh",
}: {
  stats: DashboardStats;
  lang?: Locale;
}) {
  const redFlag = KNOWLEDGE_RECORDS.find((record) => record.id === "CD-CARE-RED-FLAGS");
  const featured = KNOWLEDGE_RECORDS.filter((record) =>
    ["CD-OVERVIEW-001", "CD-GENE-TGFBI", "CD-TX-PK", "CD-RSCH-GEB101"].includes(record.id)
  );
  const isEn = lang === "en";
  const categoryLabels = isEn ? CATEGORY_LABELS_EN : CATEGORY_LABELS;

  return (
    <div className="space-y-10">
      <section className="grid min-w-0 gap-8 lg:grid-cols-[1.04fr_0.96fr] [&>*]:min-w-0">
        <div className="min-w-0 py-4">
          <p className="mb-4 max-w-full break-words text-sm uppercase tracking-[0.12em] text-[var(--teal)] md:tracking-[0.18em]">
            {isEn ? "Public knowledge base + private local log" : "公开知识库 + 本地私密记录"}
          </p>
          <h1 className="home-hero-title max-w-3xl text-[2rem] font-semibold leading-tight [overflow-wrap:anywhere] sm:text-[2.7rem] md:text-6xl">
            {isEn
              ? "Turning corneal dystrophy care into a traceable family knowledge system."
              : "把角膜营养不良，从一次次问诊，整理成可追踪的知识系统。"}
          </h1>
          <p className="home-hero-text mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] [overflow-wrap:anywhere]">
            {isEn
              ? "This site brings together disease classification, inheritance, treatment pathways, hospital and clinician references, research watch items, and post-transplant care. Personal and family records stay in your browser by default and can be exported."
              : "这里汇总疾病分型、遗传机制、治疗路径、医院医生、前沿研究和术后护理。个人和家族病史只保存在你的浏览器本地，可导出，不默认上传。"}
          </p>
          <div className="home-hero-actions mt-7 flex flex-wrap gap-3">
            <Link href={hrefFor(lang, "/library")} className="focus-ring block w-full rounded bg-[var(--accent-strong)] px-5 py-3 text-center font-medium text-white no-underline sm:w-auto">
              {isEn ? "Browse Library" : "浏览知识库"}
            </Link>
            <Link href={hrefFor(lang, "/personal")} className="focus-ring block w-full rounded border border-[var(--accent-strong)] bg-white px-5 py-3 text-center font-medium text-[var(--accent-strong)] no-underline sm:w-auto">
              {isEn ? "Create My Log" : "建立我的记录"}
            </Link>
            <Link href={hrefFor(lang, "/ask")} className="focus-ring block w-full rounded border border-[var(--line)] bg-white px-5 py-3 text-center font-medium no-underline sm:w-auto">
              {isEn ? "Ask Cornea" : "智能问答"}
            </Link>
          </div>
        </div>

        <div className="home-hero-card panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{isEn ? "Corneal Layers and Treatment Map" : "角膜层次与治疗坐标"}</h2>
            <span className="badge">{isEn ? "Layer first" : "先定位层次，再谈治疗"}</span>
          </div>
          <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-white">
            <div className="cornea-layer bg-[#f7efe8]">
              <span>{isEn ? "Epithelium / basement membrane" : "上皮 / 基底膜"}</span>
              <span className="text-[var(--muted)]">{isEn ? "erosions, pain, surface irregularity" : "糜烂、疼痛、表面不规则"}</span>
            </div>
            <div className="cornea-layer bg-[#f1f1e6]">
              <span>{isEn ? "Bowman's layer / anterior stroma" : "Bowman 层 / 前基质"}</span>
              <span className="text-[var(--muted)]">{isEn ? "PTK, superficial deposits" : "PTK、表浅沉积"}</span>
            </div>
            <div className="cornea-layer bg-[#fff3d7]">
              <span>{isEn ? "Stroma" : "基质"}</span>
              <span className="text-[var(--muted)]">{isEn ? "DALK / PK / astigmatism" : "DALK / PK / 散光"}</span>
            </div>
            <div className="cornea-layer bg-[#f6e5dd]">
              <span>{isEn ? "Descemet membrane / endothelium" : "Descemet 膜 / 内皮"}</span>
              <span className="text-[var(--muted)]">{isEn ? "DMEK / DSEK / edema" : "DMEK / DSEK / 水肿"}</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            {isEn
              ? "Even within corneal dystrophy, the affected layer changes recurrence risk, surgical options, and what should be tracked after surgery."
              : "同样是“角膜营养不良”，受累层次不同，复发风险、手术方式和术后记录重点都会变。"}
          </p>
        </div>
      </section>

      <section className="panel border-l-4 border-l-[var(--accent-strong)] p-5">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--teal)]">
          {isEn ? "Why this site exists" : "这个页面为什么存在"}
        </p>
        <h2 className="mt-2 text-3xl font-semibold">
          {isEn ? "A patient's personal open-source project." : "这是一个患者的个人开源项目。"}
        </h2>
        <p className="mt-3 max-w-4xl leading-8 text-[var(--muted)]">
          {isEn
            ? "This site is personally built and maintained by Yuxin Zhang. The reason is practical and personal: corneal dystrophy has affected me and several members of my family, and long-term care needs memory, structure, and reliable references. The site does not sell medical services, accept referral payments, or pursue commercial benefit. It exists to help my family and other patients facing similar uncertainty."
            : "本站由张玉新个人制作和维护。起因很私人，也很现实：我本人及家族多位成员长期受到角膜营养不良影响，长期随访需要记忆、结构和可靠来源。这个网页不销售医疗服务，不做挂号导流，不接受转诊利益，也没有商业目的；它首先服务于我的家族，也希望能帮助同样面对这种疾病的病友。"}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <StatCard label={isEn ? "Records" : "知识记录"} value={stats.totalRecords} tone="teal" />
        <StatCard label={isEn ? "Sources" : "权威来源"} value={stats.sourceCount} tone="green" />
        <StatCard label={isEn ? "Care nodes" : "医院节点"} value={stats.institutionCount} tone="blue" />
        <StatCard label={isEn ? "Treatment notes" : "治疗条目"} value={stats.treatmentCount} tone="coral" />
        <StatCard label={isEn ? "Last verified" : "最新核验"} value={stats.latestVerifiedAt} tone="amber" />
      </section>

      {redFlag ? (
        <section className="border-l-4 border-[var(--coral)] bg-white p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--coral)]">{isEn ? "Post-transplant red flags" : "术后红旗症状"}</p>
          <h2 className="mt-2 text-2xl font-semibold">{isEn ? redFlag.title_en : redFlag.title}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            {isEn
              ? "Redness, light sensitivity, vision loss, or pain after corneal transplantation should be treated as possible rejection or a serious complication until an eye doctor says otherwise."
              : redFlag.summary}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {(isEn ? ["Redness", "Light sensitivity", "Vision loss", "Pain"] : ["眼红", "畏光", "视力下降", "疼痛"]).map((item) => (
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
            <h2 className="text-3xl font-semibold">{isEn ? "Core Records" : "第一批核心记录"}</h2>
          </div>
          <Link href={hrefFor(lang, "/library")} className="text-sm text-[var(--teal)] underline underline-offset-4">
            {isEn ? "View all categories" : "查看全部分类"}
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((record) => (
            <RecordCard key={record.id} record={record} lang={lang} />
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">China first, global reference</p>
            <h2 className="text-3xl font-semibold">{isEn ? "China-first Hospital and Clinician Index" : "国内优先的医院医生索引"}</h2>
          </div>
          <Link href={hrefFor(lang, "/institutions")} className="text-sm text-[var(--teal)] underline underline-offset-4">
            {isEn ? "Open care map" : "打开医院医生页"}
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
        <Link href={hrefFor(lang, "/ask")} className="panel block p-5 no-underline transition hover:border-[var(--teal)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--teal)]">Ask Cornea</p>
          <h2 className="mt-2 text-2xl font-semibold">{isEn ? "Cited AI Answers" : "带引用的智能问答"}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            {isEn
              ? "Answers are grounded in the public knowledge base and return record IDs and source links. No diagnosis, no replacement for a clinician."
              : "基于公开知识库回答，自动返回记录 ID 和来源链接。不诊断，不替代医生。"}
          </p>
        </Link>
        <Link href={hrefFor(lang, "/personal")} className="panel block p-5 no-underline transition hover:border-[var(--teal)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--green)]">Local private log</p>
          <h2 className="mt-2 text-2xl font-semibold">{isEn ? "Private Local Log" : "本地私密登记"}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            {isEn
              ? "Family history, next actions, and follow-up notes stay in your browser by default and can be exported as JSON or visit briefing."
              : "家族史、下一步动作和术后复查记录默认只保存在你的浏览器，可导出 JSON 和复诊摘要。"}
          </p>
        </Link>
      </section>

      <section className="panel p-5">
        <h2 className="text-2xl font-semibold">{isEn ? "Category Coverage" : "分类覆盖"}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(stats.categoryCounts)
            .filter(([, count]) => count > 0)
            .map(([category, count]) => (
              <Link
                key={category}
                href={`${hrefFor(lang, "/library")}?category=${category}`}
                className="flex items-center justify-between rounded border border-[var(--line)] bg-white px-3 py-2 text-sm no-underline"
              >
                <span>{categoryLabels[category as keyof typeof CATEGORY_LABELS]}</span>
                <span className="text-[var(--muted)]">{count}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
