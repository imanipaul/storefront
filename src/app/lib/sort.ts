import type { ProductOrder } from "@/gql/graphql";

export type SortOption = {
  value: string;
  label: string;
  order: readonly ProductOrder[];
};

const NEWEST: SortOption = {
  value: "newest",
  label: "Newest",
  order: ["sys_firstPublishedAt_DESC"],
};
const PRICE_ASC: SortOption = {
  value: "price-asc",
  label: "Price: low to high",
  order: ["price_ASC"],
};
const PRICE_DESC: SortOption = {
  value: "price-desc",
  label: "Price: high to low",
  order: ["price_DESC"],
};

/** Sort options for browsing the catalog */
export const SORT_OPTIONS: SortOption[] = [
  { value: "featured", label: "Featured", order: ["featured_DESC", "name_ASC"] },
  NEWEST,
  PRICE_ASC,
  PRICE_DESC,
];
export const DEFAULT_SORT = "featured";

/** Sort options for search results. Relevance is ranked in code, not by Contentful. */
export const SEARCH_SORT_OPTIONS: SortOption[] = [
  { value: "relevance", label: "Relevance", order: [] },
  NEWEST,
  PRICE_ASC,
  PRICE_DESC,
];
export const DEFAULT_SEARCH_SORT = "relevance";

export function getSortOption(
  value: string | undefined,
  options: SortOption[] = SORT_OPTIONS,
): SortOption {
  return options.find((o) => o.value === value) ?? options[0];
}

export function getSortOrder(
  value: string | undefined,
  options: SortOption[] = SORT_OPTIONS,
): ProductOrder[] {
  return [...getSortOption(value, options).order];
}
