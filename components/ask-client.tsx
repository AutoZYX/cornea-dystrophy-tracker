"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Citation {
  id: string;
  title: string;
  category: string;
  evidence_level: string;
  medical_caveat: string;
  urls: string[];
}

const examples = [
  "TGFBI 相关角膜营养不良现在有哪些治疗进展？",
  "角膜移植术后出现眼红和畏光要怎么处理？",
  "DALK、PK、DMEK 的区别是什么？",
  "国内哪些医院值得重点关注角膜营养不良？",
];

export default function AskClient() {
  const [question, setQuestion] = useState(examples[0]);
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    const q = question.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setAnswer("");
    setCitations([]);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Request failed");
      setAnswer(payload.answer || "");
      setCitations(payload.citations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="panel p-5">
        <h1 className="text-3xl font-semibold">Ask Cornea Dystrophy</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          只基于本站公共知识库回答，并返回记录 ID 和来源链接。它不能诊断个人病情，也不能替代医生。
        </p>
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium">你的问题</span>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={7}
            className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2 leading-7"
            placeholder="请输入与角膜营养不良、治疗、医院、术后护理相关的问题"
          />
        </label>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="focus-ring mt-4 rounded bg-[var(--teal)] px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "检索中..." : "开始问答"}
        </button>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">示例问题</p>
          <div className="grid gap-2">
            {examples.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuestion(item)}
                className="focus-ring rounded border border-[var(--line)] bg-white px-3 py-2 text-left text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel min-h-[520px] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="badge">公共知识库</span>
          <span className="badge">强制引用</span>
          <span className="badge">非医疗建议</span>
        </div>
        {error ? <p className="text-[var(--coral)]">{error}</p> : null}
        {!answer && !error ? (
          <div className="flex h-full min-h-[360px] items-center justify-center rounded border border-dashed border-[var(--line)] text-center text-[var(--muted)]">
            提问后，答案和引用会显示在这里。
          </div>
        ) : null}
        {answer ? (
          <div>
            <div className="prose prose-neutral max-w-none leading-7">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
            {citations.length ? (
              <div className="mt-6 border-t border-[var(--line)] pt-4">
                <p className="mb-3 text-sm font-medium">结构化引用</p>
                <div className="grid gap-3">
                  {citations.map((citation) => (
                    <div key={citation.id} className="rounded border border-[var(--line)] bg-white p-3 text-sm">
                      <p className="font-medium">{citation.id}: {citation.title}</p>
                      <p className="mt-1 text-[var(--muted)]">
                        {citation.category} · 证据 {citation.evidence_level} · {citation.medical_caveat}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {citation.urls.map((url) => (
                          <a key={url} href={url} target="_blank" rel="noreferrer" className="text-[var(--teal)] underline underline-offset-4">
                            来源链接
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
