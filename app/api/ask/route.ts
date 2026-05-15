import { buildSystemContext } from "@/lib/context";
import { KNOWLEDGE_RECORDS } from "@/lib/data";
import { getSourceById } from "@/lib/sources";
import type { KnowledgeRecord } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;
const DEEPSEEK_API_URL =
  process.env.DEEPSEEK_API_URL ?? "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-pro";
const DEEPSEEK_REASONING_EFFORT =
  process.env.DEEPSEEK_REASONING_EFFORT ?? "max";

let cachedContext: string | null = null;

interface Citation {
  id: string;
  title: string;
  category: KnowledgeRecord["category"];
  evidence_level: KnowledgeRecord["evidence_level"];
  medical_caveat: KnowledgeRecord["medical_caveat"];
  urls: string[];
}

interface ChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function hasChinese(text: string) {
  return /[\u3400-\u9fff]/.test(text);
}

function sanitizeAnswer(answer: string) {
  return answer.replace(/\*\*/g, "");
}

function toCitation(record: KnowledgeRecord): Citation {
  return {
    id: record.id,
    title: record.title,
    category: record.category,
    evidence_level: record.evidence_level,
    medical_caveat: record.medical_caveat,
    urls: record.source_ids
      .map((id) => getSourceById(id)?.url)
      .filter((url): url is string => Boolean(url)),
  };
}

function extractCitations(answer: string): Citation[] {
  const ids = Array.from(new Set(answer.match(/\bCD-[A-Z0-9-]+\b/g) ?? []));
  return ids
    .map((id) => KNOWLEDGE_RECORDS.find((record) => record.id === id))
    .filter((record): record is KnowledgeRecord => Boolean(record))
    .map(toCitation);
}

function localFallback(question: string, cause: string) {
  const lower = question.toLowerCase();
  const tokens = Array.from(
    new Set(lower.match(/[a-z0-9]+|[\u3400-\u9fff]{2,}/g) ?? [])
  ).filter((token) => !["什么", "哪些", "如何", "可以", "是否"].includes(token));

  const scored = KNOWLEDGE_RECORDS.map((record) => {
    const haystack = [
      record.id,
      record.title,
      record.title_en,
      record.summary,
      record.key_points.join(" "),
      record.clinical_use?.join(" "),
      record.limits?.join(" "),
      record.tags.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += token.length >= 4 ? 4 : 1;
    }
    if (/排斥|红眼|畏光|疼痛|视力下降|urgent|pain|rejection/.test(lower)) {
      if (record.id === "CD-CARE-RED-FLAGS") score += 12;
    }
    if (/基因|t gfbi|tgfbi|geb|编辑|gene/.test(lower)) {
      if (record.tags.some((tag) => /TGFBI|基因|GEB/.test(tag))) score += 8;
    }
    if (/移植|术后|pk|dalk|dmek|dsek/.test(lower)) {
      if (record.category === "treatment" || record.category === "care") score += 4;
    }
    if (/医院|医生|哪家|专家|institution|doctor/.test(lower)) {
      if (record.category === "institution") score += 8;
    }
    return { record, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const citations = scored.map(({ record }) => toCitation(record));
  const zh = hasChinese(question);
  const sourceLines = citations.map((citation) => {
    const firstUrl = citation.urls[0] ?? "";
    return `- ${citation.id}: ${citation.title} (${citation.evidence_level}/${citation.medical_caveat}) ${firstUrl}`;
  });
  const providerNote = zh
    ? "AI 服务暂时不可用，下面返回本地知识库检索结果。这不构成医疗建议。"
    : "The AI service is temporarily unavailable, so this is a deterministic local search result. This is not medical advice.";
  const reason = /API Key/i.test(cause)
    ? zh
      ? "原因：服务端尚未配置模型 API Key。"
      : "Reason: model API key is not configured."
    : zh
      ? "原因：上游模型调用失败。"
      : "Reason: upstream model call failed.";

  if (!sourceLines.length) {
    return {
      answer: zh
        ? `### 直接结论\n${providerNote}\n\n${reason}\n\n当前数据库没有找到明确匹配记录。\n\n### 下一步\n- 建议换用分型、基因、术式、医院或症状关键词重试。\n\n### 依据记录\n- 暂无匹配记录。`
        : `### Direct Answer\n${providerNote}\n\n${reason}\n\nNo clear record matched.\n\n### Next Steps\n- Try a condition, gene, treatment, institution, or symptom keyword.\n\n### Cited Records\n- No matching record.`,
      citations,
    };
  }

  return {
    answer: zh
      ? `### 直接结论\n${providerNote}\n\n${reason}\n\n### 最相关记录\n${sourceLines.join("\n")}\n\n### 下一步\n- 请打开相关记录和来源链接核对原文。\n- 高风险症状或治疗决策应由角膜专科医生确认。\n\n### 依据记录\n${sourceLines.join("\n")}`
      : `### Direct Answer\n${providerNote}\n\n${reason}\n\n### Most Relevant Records\n${sourceLines.join("\n")}\n\n### Next Steps\n- Open the cited records and original source links.\n- High-risk symptoms or treatment decisions should be confirmed by a cornea specialist.\n\n### Cited Records\n${sourceLines.join("\n")}`,
    citations,
  };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const question = String(body.question ?? "").trim();
  if (!question || question.length > 700) {
    return NextResponse.json(
      { error: "Question is required (max 700 chars)" },
      { status: 400 }
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    const fallback = localFallback(question, "API Key missing");
    return NextResponse.json({
      ...fallback,
      answer: sanitizeAnswer(fallback.answer),
      fallback: true,
    });
  }

  if (!cachedContext) cachedContext = buildSystemContext();

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        max_tokens: 8000,
        reasoning_effort: DEEPSEEK_REASONING_EFFORT,
        thinking: { type: "enabled" },
        messages: [
          { role: "system", content: cachedContext },
          { role: "user", content: question },
        ],
      }),
    });

    const payloadText = await response.text();
    if (!response.ok) {
      throw new Error(`Model API error ${response.status}: ${payloadText.slice(0, 500)}`);
    }

    const payload = JSON.parse(payloadText) as ChatResponse;
    const text = sanitizeAnswer(payload.choices?.[0]?.message?.content?.trim() ?? "");
    if (!text) throw new Error("Model returned an empty answer");

    return NextResponse.json({ answer: text, citations: extractCitations(text) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Ask Cornea error:", message);
    const fallback = localFallback(question, message);
    return NextResponse.json({
      ...fallback,
      answer: sanitizeAnswer(fallback.answer),
      fallback: true,
    });
  }
}
