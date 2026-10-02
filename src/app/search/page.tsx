import Link from "next/link";
import { Suspense } from "react";
import { apolloClient } from "@/app/lib/apollo-client";
import { GetProductsDocument, SearchProductsDocument } from "@/gql/graphql";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";
import SearchField from "@/components/SearchField";
import { SearchIcon } from "@/components/SearchModal";
import SortSelect from "@/components/SortSelect";
import { rankByRelevance } from "@/app/lib/search";
import {
  DEFAULT_SEARCH_SORT,
  SEARCH_SORT_OPTIONS,
  getSortOption,
} from "@/app/lib/sort";

const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Accessories"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;
  const term = q?.trim() ?? "";
  const sortOption = getSortOption(sort, SEARCH_SORT_OPTIONS);

  const [results, suggestions] = await Promise.all([
    term
      ? apolloClient.query({
          query: SearchProductsDocument,
          variables: { term, limit: 50, order: [...sortOption.order] },
        })
      : null,
    apolloClient.query({
      query: GetProductsDocument,
      variables: { limit: 4, where: { featured: true } },
    }),
  ]);

  const found = results?.data?.productCollection?.items ?? [];
  const products =
    sortOption.value === DEFAULT_SEARCH_SORT ? rankByRelevance(found, term) : found;
  const suggested = suggestions.data?.productCollection?.items ?? [];
  const quotedTerm = `“${term}”`;

  return (
    <div className="px-5 md:px-10 pt-6 md:pt-8 pb-14">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <div className="flex flex-wrap items-end gap-x-4 gap-y-1 pt-3 pb-4 border-b border-(--color-border-secondary)">
        <h1 className="type-display text-[56px] md:text-[64px]">Search</h1>
        {term && (
          <p className="text-[13px] text-(--color-text-secondary) pb-1" aria-live="polite">
            {products.length} {products.length === 1 ? "result" : "results"} for{" "}
            <span className="text-(--color-text-primary) font-medium">{quotedTerm}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 mb-6 border-b border-(--color-border-secondary)">
        <div className="w-full md:max-w-xl">
          <SearchField initialQuery={term} />
        </div>
        {products.length > 1 && (
          <Suspense>
            <SortSelect
              options={SEARCH_SORT_OPTIONS.map(({ value, label }) => ({ value, label }))}
              defaultValue={DEFAULT_SEARCH_SORT}
            />
          </Suspense>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <>
          <div className="flex flex-col items-center text-center py-12 md:py-16">
            <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-(--color-background-secondary) text-(--color-text-secondary)">
              <SearchIcon size={22} />
            </div>
            <h2 className="text-lg font-medium mb-2">
              {term ? `No results for ${quotedTerm}` : "What are you looking for?"}
            </h2>
            <p className="text-sm text-(--color-text-secondary) max-w-sm mb-6">
              {term
                ? "Try a different search term, or browse by category below."
                : "Search by product name, material or category, or browse by category below."}
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/?category=${encodeURIComponent(category)}`}
                    className="inline-block px-4 py-1.5 rounded-full text-[13px] border border-(--color-border-secondary) bg-(--color-background-primary) hover:border-(--color-text-primary)"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {suggested.length > 0 && (
            <section
              aria-labelledby="you-might-like"
              className="pt-8 border-t border-(--color-border-secondary)"
            >
              <h2
                id="you-might-like"
                className="type-display text-[32px] md:text-[40px] mb-5"
              >
                You might like
              </h2>
              <ProductGrid products={suggested} />
            </section>
          )}
        </>
      )}
    </div>
  );
}
