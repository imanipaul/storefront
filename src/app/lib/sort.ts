import type { ProductOrder } from "@/gql/graphql";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured", order: ["featured_DESC", "name_ASC"] },
  { value: "newest", label: "Newest", order: ["sys_firstPublishedAt_DESC"] },
  { value: "price-asc", label: "Price: low to high", order: ["price_ASC"] },
  { value: "price-desc", label: "Price: high to low", order: ["price_DESC"] },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  order: readonly ProductOrder[];
}>;

export const DEFAULT_SORT = "featured";

export function getSortOrder(value: string | undefined): ProductOrder[] {
  const option =
    SORT_OPTIONS.find((o) => o.value === value) ??
    SORT_OPTIONS.find((o) => o.value === DEFAULT_SORT)!;
  return [...option.order];
}
