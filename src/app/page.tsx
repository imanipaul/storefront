import ProductGrid from "@/components/ProductGrid";
import { apolloClient } from "./lib/apollo-client";
import {
  GetCampaignCollectionDocument,
  GetProductsDocument,
} from "@/gql/graphql";
import FilterPills from "@/components/FIlterPills";
import SortSelect from "@/components/SortSelect";
import CampaignTile from "@/components/CampaignTile";
import { getSortOrder } from "./lib/sort";
import type { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import { Suspense } from "react";

export default async function ShopAllPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    featured?: string;
  }>;
}) {
  const { category, sort, featured } = await searchParams;
  const isFiltered = !!category || featured === "true";

  const [products, catalog, campaign] = await Promise.all([
    apolloClient.query({
      query: GetProductsDocument,
      variables: {
        limit: 50,
        where: {
          ...(category && { category }),
          ...(featured === "true" && { featured: true }),
        },
        order: getSortOrder(sort),
      },
    }),
    // Size of the whole catalog, for the "N pieces" count by the title
    isFiltered
      ? apolloClient.query({
          query: GetProductsDocument,
          variables: { limit: 0 },
        })
      : null,
    apolloClient.query({ query: GetCampaignCollectionDocument }),
  ]);

  const items = products.data?.productCollection?.items ?? [];
  const resultCount = products.data?.productCollection?.total ?? items.length;
  const catalogCount =
    catalog?.data?.productCollection?.total ?? resultCount;
  const collection = campaign.data?.collectionCollection?.items[0];

  // The campaign tile only appears in the unfiltered view
  const campaignTile =
    !isFiltered && collection?.slug ? (
      <CampaignTile
        slug={collection.slug}
        title={collection.title ?? ""}
        description={collection.description?.json as Document | undefined}
        productCount={collection.productsCollection?.total ?? 0}
      />
    ) : undefined;

  return (
    <div className="px-5 md:px-10 pt-6 md:pt-8 pb-14">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-xs text-(--color-text-secondary)">
          <li>
            <Link href="/" className="hover:text-(--color-text-primary)">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Shop all</li>
        </ol>
      </nav>

      <div className="flex items-end gap-4 pt-3 pb-4 border-b border-(--color-border-secondary)">
        <h1 className="type-display text-[56px] md:text-[64px]">Shop all</h1>
        <p className="text-[13px] text-(--color-text-secondary) pb-1">
          {catalogCount} {catalogCount === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 mb-6 border-b border-(--color-border-secondary)">
        <Suspense>
          <FilterPills />
        </Suspense>
        <div className="flex items-center gap-4 ml-auto">
          <p className="text-[13px] text-(--color-text-secondary)" aria-live="polite">
            {resultCount} {resultCount === 1 ? "item" : "items"}
          </p>
          <Suspense>
            <SortSelect />
          </Suspense>
        </div>
      </div>

      <ProductGrid products={items} feature={campaignTile} />
    </div>
  );
}
