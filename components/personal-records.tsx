"use client";

import { useEffect, useMemo, useState } from "react";
import type { FollowUpRecord, PersonalProfile } from "@/lib/types";

const STORAGE_KEY = "cornea-dystrophy-log-v1";

interface StoredData {
  profiles: PersonalProfile[];
  followUps: FollowUpRecord[];
}

const emptyData: StoredData = { profiles: [], followUps: [] };

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function PersonalRecords() {
  const [data, setData] = useState<StoredData>(emptyData);
  const [loaded, setLoaded] = useState(false);
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
        <h1 className="text-3xl font-semibold">我的私密记录</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          这些内容默认只保存在当前浏览器的 localStorage。本站不会自动上传病历、家族史或儿童信息。
          换设备前请导出 JSON；清理浏览器数据会删除记录。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={exportJson} className="focus-ring rounded bg-[var(--teal)] px-4 py-2 text-white">
            导出 JSON
          </button>
          <button type="button" onClick={exportBriefing} className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-2">
            导出复诊摘要
          </button>
          <button type="button" onClick={clearAll} className="focus-ring rounded border border-[var(--coral)] px-4 py-2 text-[var(--coral)]">
            清空本机记录
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
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

      <section className="grid gap-5 lg:grid-cols-2">
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
