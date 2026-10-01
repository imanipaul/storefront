"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"];

export default function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All" || filter === activeCategory) {
      params.delete("category");
    } else {
      params.set("category", filter);
    }
    params.delete("skip");
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex items-center gap-2 overflow-x-auto min-w-0 max-w-full [scrollbar-width:none]"
    >
      {filters.map((filter) => {
        const isActive = activeCategory === filter;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-[13px] cursor-pointer whitespace-nowrap border transition-colors ${
              isActive
                ? "bg-(--color-text-primary) text-(--color-background-primary) border-(--color-text-primary)"
                : "bg-(--color-background-primary) border-(--color-border-secondary) text-(--color-text-primary) hover:border-(--color-text-primary)"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
