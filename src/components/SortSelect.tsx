"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_SORT, SORT_OPTIONS } from "@/app/lib/sort";

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? DEFAULT_SORT;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <label className="flex items-center gap-2 text-[13px] text-(--color-text-secondary)">
      Sort
      <span className="relative">
        <select
          value={current}
          onChange={(e) => handleChange(e.target.value)}
          className="appearance-none cursor-pointer min-w-36 rounded-(--border-radius-md) border border-(--color-border-primary) bg-(--color-background-primary) py-2 pl-3 pr-8 text-[13px] text-(--color-text-primary)"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}
