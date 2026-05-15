"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_LABELS } from "@/lib/data";
import { CATEGORY_LABELS_EN, type Locale } from "@/lib/i18n";
import type { Category, KnowledgeRecord } from "@/lib/types";
import RecordCard from "./record-card";

const categories = Object.keys(CATEGORY_LABELS) as Category[];

export default function LibraryBrowser({
  records,
  lang = "zh",
}: {
  records: KnowledgeRecord[];
  lang?: Locale;
}) {
  const params = useSearchParams();
  const initial = params.get("category") as Category | null;
  const [category, setCategory] = useState<Category | "all">(
    initial && categories.includes(initial) ? initial : "all"
  );
  const [query, setQuery] = useState("");
  const isEn = lang === "en";
  const labels = isEn ? CATEGORY_LABELS_EN : CATEGORY_LABELS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((record) => {
      if (category !== "all" && record.category !== category) return false;
      if (!q) return true;
      const text = [
        record.id,
        record.title,
        record.title_en,
        record.summary,
        record.key_points.join(" "),
        record.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [records, category, query]);

  return (
    <div className="space-y-6">
      <div className="panel p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{isEn ? "Search" : "搜索关键词"}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isEn ? "TGFBI, PTK, rejection, DMEK, child, Shanghai" : "例如 TGFBI、PTK、排斥、DMEK、儿童、上海"}
              className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{isEn ? "Category" : "分类"}</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as Category | "all")}
              className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
            >
              <option value="all">{isEn ? "All categories" : "全部分类"}</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {labels[item]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`focus-ring rounded-full border px-3 py-1 text-sm ${
                category === item
                  ? "border-[var(--teal)] bg-[var(--teal)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--muted)]"
              }`}
            >
              {labels[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-[var(--muted)]">
        {isEn ? `Showing ${filtered.length} records.` : `当前显示 ${filtered.length} 条记录。`}
      </div>

      <div className="grid gap-4">
        {filtered.map((record) => (
          <RecordCard key={record.id} record={record} lang={lang} />
        ))}
      </div>
    </div>
  );
}
