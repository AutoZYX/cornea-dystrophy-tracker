import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEEPSEEK_API_URL =
  process.env.DEEPSEEK_API_URL ?? "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-pro";
const DEEPSEEK_REASONING_EFFORT =
  process.env.DEEPSEEK_REASONING_EFFORT ?? "max";

type Eye = "left" | "right" | "both" | "unknown";

interface ExtractionResult {
  summary: string;
  eventType: "baseline" | "symptom_event" | "follow_up" | "next_action" | "family_history" | "unknown";
  urgency: "routine" | "soon" | "urgent";
  confidence: number;
  redFlags: string[];
  suggestedNextAction: string;
  profiles: Array<{
    label: string;
    relation: string;
    affectedStatus: string;
    currentStatus: string;
    history: string;
    nextAction: string;
  }>;
  followUps: Array<{
    date: string;
    eye: Eye;
    visitType: string;
    hospital: string;
    doctor: string;
    visualAcuity: string;
    astigmatism: string;
    iop: string;
    corneaStatus: string;
    medication: string;
    warningSigns: string;
    nextPlan: string;
    notes: string;
  }>;
  notes: string[];
  fallback?: boolean;
  model?: string;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 60 * 1000;

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

function today() {
  return new Date().toISOString().slice(0, 10);
}

function detectEye(text: string): Eye {
  if (/双眼|两眼|双侧/.test(text)) return "both";
  if (/右眼/.test(text)) return "right";
  if (/左眼/.test(text)) return "left";
  return "unknown";
}

function detectRedFlags(text: string) {
  const flags: string[] = [];
  if (/眼红|红肿|发红|充血/.test(text)) flags.push("眼红/红肿");
  if (/畏光|怕光|光敏/.test(text)) flags.push("畏光");
  if (/视力下降|看不清|模糊加重|突然模糊/.test(text)) flags.push("视力下降");
  if (/疼痛|眼痛|刺痛|胀痛/.test(text)) flags.push("疼痛");
  return flags;
}

function extractDate(text: string) {
  const iso = text.match(/(20\d{2})[-/.年](\d{1,2})[-/.月](\d{1,2})/);
  if (iso) {
    const [, year, month, day] = iso;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  if (/今天|现在|目前|当下/.test(text)) return today();
  return today();
}

function localExtract(text: string, reason: string): ExtractionResult {
  const redFlags = detectRedFlags(text);
  const eye = detectEye(text);
  const hasTransplant = /移植|PK|DALK|DMEK|DSEK|DSAEK/i.test(text);
  const hasFamily = /家族|父亲|爷爷|奶奶|姑姑|孩子|儿子|女儿|母亲|兄弟|姐妹|哥哥|姐姐|妹妹|弟弟/.test(text);
  const hasAstigmatism = /散光/.test(text);
  const postopMatch = text.match(/术后\s*([0-9一二三四五六七八九十]+)\s*(年|个月|月)/);
  const currentStatus = text;
  const profileNeeded = hasFamily || /我|本人|自己/.test(text);
  const urgency = redFlags.length ? "urgent" : /复查|检查|预约/.test(text) ? "soon" : "routine";
  const suggestedNextAction = redFlags.length
    ? "出现术后眼红、畏光、视力下降或疼痛时，应尽快联系眼科医生或急诊眼科服务，排除排斥反应、感染或其他严重并发症。"
    : hasTransplant
      ? "下次复诊建议带上验光、角膜地形图/断层、眼压、用药和植片状态记录，重点讨论散光、干眼、排斥风险和长期用药。"
      : "建议在下次眼科复查时补充诊断分型、角膜层次、影像检查和家族史。";

  return {
    summary: text.length > 120 ? `${text.slice(0, 118)}...` : text,
    eventType: redFlags.length ? "symptom_event" : hasFamily ? "family_history" : hasTransplant ? "baseline" : "unknown",
    urgency,
    confidence: 0.62,
    redFlags,
    suggestedNextAction,
    profiles: profileNeeded
      ? [
          {
            label: /父亲/.test(text) ? "父亲/家族成员" : "本人",
            relation: /父亲/.test(text) ? "父亲或家族成员" : "本人",
            affectedStatus: hasTransplant ? "已行角膜移植术后" : hasFamily ? "家族史/疑似或已知患病" : "",
            currentStatus,
            history: postopMatch ? `角膜移植术后 ${postopMatch[1]}${postopMatch[2]}` : hasTransplant ? "有角膜移植相关病史" : "",
            nextAction: suggestedNextAction,
          },
        ]
      : [],
    followUps: [
      {
        date: extractDate(text),
        eye,
        visitType: redFlags.length ? "症状事件" : hasTransplant ? "角膜移植术后状态记录" : "自然语言记录",
        hospital: "",
        doctor: "",
        visualAcuity: /小字|阅读|看小/.test(text) ? "小字阅读受限" : "",
        astigmatism: hasAstigmatism ? "文本提及散光" : "",
        iop: "",
        corneaStatus: hasTransplant ? "角膜移植术后，需结合医生复查判断植片状态" : "",
        medication: "",
        warningSigns: redFlags.join("、"),
        nextPlan: suggestedNextAction,
        notes: reason === "normalize" ? "基础规则补全模型未返回的记录字段。" : `本地规则提取。原因：${reason}`,
      },
    ],
    notes: ["本次结果由本地规则提取，建议保存前人工确认。"],
    fallback: true,
    model: "local-rule-fallback",
  };
}

function normalizeResult(input: Partial<ExtractionResult>, originalText: string): ExtractionResult {
  const fallback = localExtract(originalText, "normalize");
  return {
    summary: String(input.summary || fallback.summary),
    eventType: input.eventType || fallback.eventType,
    urgency: input.urgency || fallback.urgency,
    confidence: Number.isFinite(input.confidence) ? Number(input.confidence) : fallback.confidence,
    redFlags: Array.isArray(input.redFlags) ? input.redFlags.map(String) : fallback.redFlags,
    suggestedNextAction: String(input.suggestedNextAction || fallback.suggestedNextAction),
    profiles: Array.isArray(input.profiles) && input.profiles.length ? input.profiles : fallback.profiles,
    followUps: Array.isArray(input.followUps) && input.followUps.length ? input.followUps : fallback.followUps,
    notes: Array.isArray(input.notes) ? input.notes.map(String) : [],
    model: DEEPSEEK_MODEL,
  };
}

function parseJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
  return JSON.parse(cleaned);
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
  const text = String(body.text ?? "").trim();
  if (!text || text.length > 2000) {
    return NextResponse.json(
      { error: "Text is required (max 2000 chars)" },
      { status: 400 }
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(localExtract(text, "DeepSeek API Key missing"));
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        max_tokens: 2400,
        reasoning_effort: DEEPSEEK_REASONING_EFFORT,
        thinking: { type: "enabled" },
        messages: [
          {
            role: "system",
            content:
              "You extract structured corneal dystrophy patient-log data from one user-written narrative. Return JSON only. Do not diagnose. Do not invent hospitals, doctors, acuity, IOP, medication, or dates if absent. Use Chinese for user-facing fields when the input is Chinese, English when the input is English. Red flags after corneal transplant include redness, light sensitivity, vision loss, and pain; mark urgency urgent and suggest contacting an ophthalmologist or emergency eye care. Schema: { summary, eventType: baseline|symptom_event|follow_up|next_action|family_history|unknown, urgency: routine|soon|urgent, confidence: 0-1, redFlags: string[], suggestedNextAction, profiles: [{label, relation, affectedStatus, currentStatus, history, nextAction}], followUps: [{date, eye:left|right|both|unknown, visitType, hospital, doctor, visualAcuity, astigmatism, iop, corneaStatus, medication, warningSigns, nextPlan, notes}], notes: string[] }.",
          },
          { role: "user", content: text },
        ],
      }),
    });

    const payloadText = await response.text();
    if (!response.ok) {
      throw new Error(`DeepSeek error ${response.status}: ${payloadText.slice(0, 300)}`);
    }
    const payload = JSON.parse(payloadText) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek returned empty extraction");
    return NextResponse.json(normalizeResult(parseJson(content), text));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Record extraction error:", message);
    return NextResponse.json(localExtract(text, message));
  }
}
