"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_LABELS } from "@/lib/data";
import type { Category, KnowledgeRecord } from "@/lib/types";
import RecordCard from "./record-card";

const categories = Object.keys(CATEGORY_LABELS) as Category[];

export default function LibraryBrowser({ records }: { records: KnowledgeRecord[] }) {
  const params = useSearchParams();
  const initial = params.get("category") as Category | null;
  const [category, setCategory] = useState<Category | "all">(
    initial && categories.includes(initial) ? initial : "all"
  );
  const [query, setQuery] = useState("");

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
            <span className="mb-2 block text-sm font-medium">搜索关键词</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如 TGFBI、PTK、排斥、DMEK、儿童、上海"
              className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">分类</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as Category | "all")}
              className="focus-ring w-full rounded border border-[var(--line)] bg-white px-3 py-2"
            >
              <option value="all">全部分类</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {CATEGORY_LABELS[item]}
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
              {CATEGORY_LABELS[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-[var(--muted)]">当前显示 {filtered.length} 条记录。</div>

      <div className="grid gap-4">
        {filtered.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}
