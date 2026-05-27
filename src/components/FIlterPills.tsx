"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Featured"];

export default function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete("category");
    } else {
      params.set("category", filter);
    }
    params.delete("skip");
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[var(--color-border-tertiary)]">
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs cursor-pointer whitespace-nowrap border transition-colors ${
              isActive
                ? "bg-[var(--color-text-primary)] text-[var(--color-background-primary)] border-[var(--color-text-primary)]"
                : "bg-transparent border-[var(--color-border-secondary)] text-[var(--color-text-secondary)]"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
