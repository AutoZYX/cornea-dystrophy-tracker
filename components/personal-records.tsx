"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { FollowUpRecord, PersonalProfile } from "@/lib/types";

const STORAGE_KEY = "cornea-dystrophy-log-v1";

interface StoredData {
  profiles: PersonalProfile[];
  followUps: FollowUpRecord[];
}

interface ExtractedRecord {
  summary: string;
  eventType: string;
  urgency: "routine" | "soon" | "urgent";
  confidence: number;
  redFlags: string[];
  suggestedNextAction: string;
  profiles: Array<Omit<PersonalProfile, "id" | "updatedAt">>;
  followUps: Array<Omit<FollowUpRecord, "id">>;
  notes: string[];
  fallback?: boolean;
  model?: string;
}

const emptyData: StoredData = { profiles: [], followUps: [] };
const narrativeExamples = [
  "我现在是双眼角膜移植术后 5 年，平时用眼正常，但如果夜晚用眼过多，第二天会出现严重散光。",
  "今天右眼发生红肿、畏光，看小字明显变困难，之前做过角膜移植。",
  "父亲和爷爷都有类似角膜问题，我想记录家族史，并安排下一次角膜地形图和基因检测咨询。",
];

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function PersonalRecords({ lang = "zh" }: { lang?: Locale }) {
  const isEn = lang === "en";
  const [data, setData] = useState<StoredData>(emptyData);
  const [loaded, setLoaded] = useState(false);
  const [narrative, setNarrative] = useState(narrativeExamples[0]);
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [extraction, setExtraction] = useState<ExtractedRecord | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [profile, setProfile] = useState({
    label: "",
    relation: "",
    affectedStatus: "",
    currentStatus: "",
    history: "",
    nextAction: "",
  });
  const [followUp, setFollowUp] = useState({
    date: "",
    eye: "unknown" as FollowUpRecord["eye"],
    visitType: "",
    hospital: "",
    doctor: "",
    visualAcuity: "",
    astigmatism: "",
    iop: "",
    corneaStatus: "",
    medication: "",
    warningSigns: "",
    nextPlan: "",
    notes: "",
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          setData(JSON.parse(raw));
        } catch {
          setData(emptyData);
        }
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, loaded]);

  const briefing = useMemo(() => {
    const latest = [...data.followUps].sort((a, b) => b.date.localeCompare(a.date))[0];
    const active = data.profiles.filter((item) => item.affectedStatus || item.currentStatus);
    return [
      "# 角膜营养不良复诊摘要",
      "",
      `生成时间：${new Date().toISOString().slice(0, 10)}`,
      "",
      "## 家族/个人概况",
      active.length
        ? active.map((item) => `- ${item.label || "未命名"}（${item.relation || "关系未填"}）：${item.affectedStatus || "状态未填"}；下一步：${item.nextAction || "未填写"}`).join("\n")
        : "- 尚未填写家族或个人概况。",
      "",
      "## 最近一次复查",
      latest
        ? [
            `- 日期：${latest.date || "未填"}`,
            `- 眼别：${latest.eye}`,
            `- 医院/医生：${latest.hospital || "未填"} / ${latest.doctor || "未填"}`,
            `- 视力：${latest.visualAcuity || "未填"}`,
            `- 散光：${latest.astigmatism || "未填"}`,
            `- 眼压：${latest.iop || "未填"}`,
            `- 角膜状态：${latest.corneaStatus || "未填"}`,
            `- 用药：${latest.medication || "未填"}`,
            `- 警示症状：${latest.warningSigns || "未填"}`,
            `- 下一步：${latest.nextPlan || "未填"}`,
          ].join("\n")
        : "- 尚未填写复查记录。",
    ].join("\n");
  }, [data]);

  function addProfile() {
    setData((current) => ({
      ...current,
      profiles: [
        ...current.profiles,
        {
          id: uid("profile"),
          ...profile,
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
    setProfile({
      label: "",
      relation: "",
      affectedStatus: "",
      currentStatus: "",
      history: "",
      nextAction: "",
    });
  }

  function addFollowUp() {
    setData((current) => ({
      ...current,
      followUps: [
        ...current.followUps,
        {
          id: uid("followup"),
          ...followUp,
          date: followUp.date || new Date().toISOString().slice(0, 10),
        },
      ],
    }));
    setFollowUp({
      date: "",
      eye: "unknown",
      visitType: "",
      hospital: "",
      doctor: "",
      visualAcuity: "",
      astigmatism: "",
      iop: "",
      corneaStatus: "",
      medication: "",
      warningSigns: "",
      nextPlan: "",
      notes: "",
    });
  }

  async function extractNarrative() {
    const text = narrative.trim();
    if (!text) return;
    setExtracting(true);
    setExtractError("");
    setSaveMessage("");
    setExtraction(null);
    try {
      const response = await fetch("/api/extract-record", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Extraction failed");
      setExtraction(payload);
    } catch (err) {
      setExtractError(err instanceof Error ? err.message : String(err));
    } finally {
      setExtracting(false);
    }
  }

  function saveExtraction() {
    if (!extraction) return;
    const now = new Date().toISOString();
    setData((current) => ({
      profiles: [
        ...current.profiles,
        ...extraction.profiles.map((item) => ({
          id: uid("profile"),
          label: item.label || "未命名记录",
          relation: item.relation || "",
          affectedStatus: item.affectedStatus || "",
          currentStatus: item.currentStatus || "",
          history: item.history || "",
          nextAction: item.nextAction || extraction.suggestedNextAction || "",
          updatedAt: now,
        })),
      ],
      followUps: [
        ...current.followUps,
        ...extraction.followUps.map((item) => ({
          id: uid("followup"),
          date: item.date || new Date().toISOString().slice(0, 10),
          eye: item.eye || "unknown",
          visitType: item.visitType || extraction.eventType || "自然语言记录",
          hospital: item.hospital || "",
          doctor: item.doctor || "",
          visualAcuity: item.visualAcuity || "",
          astigmatism: item.astigmatism || "",
          iop: item.iop || "",
          corneaStatus: item.corneaStatus || "",
          medication: item.medication || "",
          warningSigns: item.warningSigns || extraction.redFlags.join("、"),
          nextPlan: item.nextPlan || extraction.suggestedNextAction || "",
          notes: item.notes || extraction.summary || "",
        })),
      ],
    }));
    setSaveMessage("已保存到当前浏览器本地记录。");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cornea-log-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportBriefing() {
    const blob = new Blob([briefing], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cornea-visit-briefing-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    const ok = window.confirm("确定清空本机浏览器里的私密记录吗？此操作不可撤销。");
    if (!ok) return;
    setData(emptyData);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="space-y-6">
      <section className="border-l-4 border-[var(--teal)] bg-white p-5">
        <h1 className="text-3xl font-semibold">{isEn ? "My Private Local Log" : "我的私密记录"}</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          {isEn
            ? "Records are stored in this browser's localStorage by default. The smart extractor only sends the text you type in this box and does not read saved local records. Export JSON before switching devices; clearing browser data deletes the log."
            : "这些内容默认只保存在当前浏览器的 localStorage。本站不会自动上传病历、家族史或儿童信息。智能提取只会发送你本次输入的这段文字，不会读取已保存的本地记录。换设备前请导出 JSON；清理浏览器数据会删除记录。"}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={exportJson} className="focus-ring rounded bg-[var(--teal)] px-4 py-2 text-white">
            {isEn ? "Export JSON" : "导出 JSON"}
          </button>
          <button type="button" onClick={exportBriefing} className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-2">
            {isEn ? "Export Visit Briefing" : "导出复诊摘要"}
          </button>
          <button type="button" onClick={clearAll} className="focus-ring rounded border border-[var(--coral)] px-4 py-2 text-[var(--coral)]">
            {isEn ? "Clear Local Log" : "清空本机记录"}
          </button>
        </div>
      </section>

      <section className="panel p-5">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--teal)]">Natural language intake</p>
            <h2 className="mt-2 text-2xl font-semibold">{isEn ? "Write one narrative, then review structured fields" : "用一段话记录，系统自动整理"}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              {isEn
                ? "Describe history, post-transplant status, symptoms, or next actions in natural language. The system extracts a profile and follow-up/event note; you review before saving."
                : "可以像写日记一样描述病史、术后状态、当天症状或下一步计划。系统会提取为“个人概况”和“复查/事件记录”，保存前仍由你确认。"}
            </p>
            <div className="mt-4 grid gap-2">
              {narrativeExamples.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setNarrative(item)}
                  className="focus-ring rounded border border-[var(--line)] bg-white px-3 py-2 text-left text-sm leading-6 text-[var(--muted)] hover:text-[var(--text)]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{isEn ? "Narrative note" : "自然语言记录"}</span>
              <textarea
                value={narrative}
                onChange={(event) => setNarrative(event.target.value)}
                rows={8}
                className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2 leading-7"
                placeholder={isEn ? "Example: I am 5 years after bilateral corneal transplantation..." : "例如：我现在是双眼角膜移植术后 5 年..."}
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={extractNarrative}
                disabled={extracting}
                className="focus-ring rounded bg-[var(--accent-strong)] px-4 py-2 font-medium text-white disabled:opacity-60"
              >
                {extracting ? (isEn ? "Extracting..." : "提取中...") : (isEn ? "Extract" : "智能提取")}
              </button>
              {extraction ? (
                <button
                  type="button"
                  onClick={saveExtraction}
                  className="focus-ring rounded border border-[var(--accent-strong)] bg-white px-4 py-2 font-medium text-[var(--accent-strong)]"
                >
                  {isEn ? "Save Extraction" : "保存提取结果"}
                </button>
              ) : null}
            </div>
            {extractError ? <p className="mt-3 text-sm text-[var(--coral)]">{extractError}</p> : null}
            {saveMessage ? <p className="mt-3 text-sm text-[var(--green)]">{saveMessage}</p> : null}
          </div>
        </div>

        {extraction ? (
          <div className="mt-5 rounded border border-[var(--line)] bg-[var(--surface-soft)] p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="badge">事件：{extraction.eventType}</span>
              <span className="badge">紧急度：{extraction.urgency}</span>
              <span className="badge">置信度：{Math.round(extraction.confidence * 100)}%</span>
              <span className="badge">模型：{extraction.model || "DeepSeek"}</span>
              {extraction.fallback ? <span className="badge">fallback</span> : null}
            </div>
            <p className="leading-7 text-[var(--text)]">{extraction.summary}</p>
            {extraction.redFlags.length ? (
              <div className="mt-3 rounded border border-[var(--coral)] bg-white p-3 text-[var(--coral)]">
                识别到红旗症状：{extraction.redFlags.join("、")}。请优先联系眼科医生或急诊眼科服务。
              </div>
            ) : null}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <PreviewBlock
                title="将写入个人/家族概况"
                lines={extraction.profiles.length
                  ? extraction.profiles.map((item) => `${item.label || "未命名"}：${item.affectedStatus || item.currentStatus || "待确认"}；下一步：${item.nextAction || extraction.suggestedNextAction}`)
                  : ["未提取到个人/家族概况。"]}
              />
              <PreviewBlock
                title="将写入复查/事件记录"
                lines={extraction.followUps.length
                  ? extraction.followUps.map((item) => `${item.date || "日期未填"} · ${item.eye || "unknown"} · ${item.visitType || "记录"} · ${item.warningSigns || item.astigmatism || item.notes || "待确认"}`)
                  : ["未提取到复查或症状事件。"]}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">建议下一步：{extraction.suggestedNextAction}</p>
          </div>
        ) : null}
      </section>

      <details className="rounded border border-[var(--line)] bg-[var(--surface-soft)] p-4">
        <summary className="cursor-pointer text-lg font-semibold text-[var(--text)]">
          高级手动编辑
        </summary>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          如果智能提取缺少某个字段，可以展开后手动补充。日常记录建议优先使用上方的一段话输入。
        </p>
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">家族或个人患病情况</h2>
          <div className="mt-4 grid gap-3">
            <Input label="姓名/代号" value={profile.label} onChange={(v) => setProfile({ ...profile, label: v })} placeholder="例如 我、父亲、Lucky、姑姑家哥哥" />
            <Input label="关系" value={profile.relation} onChange={(v) => setProfile({ ...profile, relation: v })} placeholder="本人/父亲/孩子/旁系亲属" />
            <Input label="患病情况" value={profile.affectedStatus} onChange={(v) => setProfile({ ...profile, affectedStatus: v })} placeholder="疑似/已确诊/已手术/待排查" />
            <TextArea label="当下状况" value={profile.currentStatus} onChange={(v) => setProfile({ ...profile, currentStatus: v })} placeholder="视力、散光、疼痛、畏光、阅读限制等" />
            <TextArea label="病史发展" value={profile.history} onChange={(v) => setProfile({ ...profile, history: v })} placeholder="发病年龄、手术史、复发、家族线索" />
            <TextArea label="下一个动作" value={profile.nextAction} onChange={(v) => setProfile({ ...profile, nextAction: v })} placeholder="复诊、基因检测、角膜地形图、配镜评估等" />
            <button type="button" onClick={addProfile} className="focus-ring rounded bg-[var(--green)] px-4 py-2 text-white">
              新增概况
            </button>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">角膜移植/复查记录</h2>
          <div className="mt-4 grid gap-3">
            <Input label="日期" type="date" value={followUp.date} onChange={(v) => setFollowUp({ ...followUp, date: v })} />
            <label className="block">
              <span className="mb-1 block text-sm font-medium">眼别</span>
              <select
                value={followUp.eye}
                onChange={(event) => setFollowUp({ ...followUp, eye: event.target.value as FollowUpRecord["eye"] })}
                className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
              >
                <option value="unknown">未填</option>
                <option value="left">左眼</option>
                <option value="right">右眼</option>
                <option value="both">双眼</option>
              </select>
            </label>
            <Input label="复查/手术类型" value={followUp.visitType} onChange={(v) => setFollowUp({ ...followUp, visitType: v })} placeholder="术后复查、PK、DALK、DMEK、PTK 等" />
            <Input label="医院" value={followUp.hospital} onChange={(v) => setFollowUp({ ...followUp, hospital: v })} />
            <Input label="医生" value={followUp.doctor} onChange={(v) => setFollowUp({ ...followUp, doctor: v })} />
            <Input label="视力" value={followUp.visualAcuity} onChange={(v) => setFollowUp({ ...followUp, visualAcuity: v })} placeholder="裸眼/最佳矫正都可写" />
            <Input label="散光" value={followUp.astigmatism} onChange={(v) => setFollowUp({ ...followUp, astigmatism: v })} placeholder="度数、轴位、是否规则" />
            <Input label="眼压" value={followUp.iop} onChange={(v) => setFollowUp({ ...followUp, iop: v })} />
            <TextArea label="角膜状态" value={followUp.corneaStatus} onChange={(v) => setFollowUp({ ...followUp, corneaStatus: v })} placeholder="透明度、植片、缝线、内皮、厚度等" />
            <TextArea label="用药" value={followUp.medication} onChange={(v) => setFollowUp({ ...followUp, medication: v })} placeholder="滴眼液、频率、医生调整" />
            <TextArea label="红旗症状" value={followUp.warningSigns} onChange={(v) => setFollowUp({ ...followUp, warningSigns: v })} placeholder="眼红、畏光、视力下降、疼痛" />
            <TextArea label="下一步计划" value={followUp.nextPlan} onChange={(v) => setFollowUp({ ...followUp, nextPlan: v })} />
            <TextArea label="备注" value={followUp.notes} onChange={(v) => setFollowUp({ ...followUp, notes: v })} />
            <button type="button" onClick={addFollowUp} className="focus-ring rounded bg-[var(--green)] px-4 py-2 text-white">
              新增复查记录
            </button>
          </div>
        </div>
        </section>
      </details>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">已记录概况</h2>
          <div className="mt-4 grid gap-3">
            {data.profiles.length ? data.profiles.map((item) => (
              <div key={item.id} className="rounded border border-[var(--line)] bg-white p-3">
                <p className="font-medium">{item.label || "未命名"} · {item.relation || "关系未填"}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.affectedStatus || "患病情况未填"}</p>
                <p className="mt-2 text-sm leading-6">{item.nextAction || "下一步未填"}</p>
              </div>
            )) : <p className="text-[var(--muted)]">尚无记录。</p>}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">已记录事件</h2>
          <div className="mt-4 grid gap-3">
            {data.followUps.length ? [...data.followUps]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 8)
              .map((item) => (
                <div key={item.id} className="rounded border border-[var(--line)] bg-white p-3">
                  <p className="font-medium">{item.date || "日期未填"} · {item.eye}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.visitType || "记录类型未填"}</p>
                  <p className="mt-2 text-sm leading-6">{item.warningSigns || item.astigmatism || item.nextPlan || "细节未填"}</p>
                </div>
              )) : <p className="text-[var(--muted)]">尚无事件或复查记录。</p>}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">复诊摘要预览</h2>
          <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded border border-[var(--line)] bg-white p-4 text-sm leading-6 text-[var(--text)]">
            {briefing}
          </pre>
        </div>
      </section>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2 leading-6"
      />
    </label>
  );
}

function PreviewBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded border border-[var(--line)] bg-white p-3">
      <p className="mb-2 text-sm font-semibold text-[var(--text)]">{title}</p>
      <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
        {lines.map((line) => (
          <li key={line}>• {line}</li>
        ))}
      </ul>
    </div>
  );
}
