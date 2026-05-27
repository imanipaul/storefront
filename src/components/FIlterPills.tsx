"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="flex justify-between">
      <button onClick={() => handleFilter("All")}>All</button>
      <button onClick={() => handleFilter("Tops")}>Tops</button>
      <button onClick={() => handleFilter("Bottoms")}>Bottoms</button>
      <button onClick={() => handleFilter("Outerwear")}>Outerwear</button>
      <button onClick={() => handleFilter("Accessories")}>Accessories</button>
      <button onClick={() => handleFilter("Featured")}>Featured</button>
    </div>
  );
}
