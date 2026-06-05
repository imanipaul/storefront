"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  "All",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
  "Featured",
];

export default function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    console.log("params", params);
    console.log("!!params.get(featured)", !!params.get("featured"));
    if (filter === "All") {
      params.delete("category");
      params.delete("featured");
    } else if (filter === "Featured") {
      !!params.get("featured")
        ? params.delete("featured")
        : params.set("featured", "true");
    } else {
      params.get("category") === filter
        ? params.delete("category")
        : params.set("category", filter);
    }
    params.delete("skip");
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-1.5 px-5 py-3 border-b border-(--color-border-tertiary)">
      {filters.map((filter) => {
        const isActive =
          filter === "Featured"
            ? searchParams.has("featured")
            : (searchParams.get("category") ?? "All") === filter;
        return (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs cursor-pointer whitespace-nowrap border transition-colors ${
              isActive
                ? "bg-(--color-text-primary) text-(--color-background-primary) border-(--color-text-primary)"
                : "bg-transparent border-(--color-border-secondary) text-(--color-text-secondary)"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
