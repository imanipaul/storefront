import ProductGrid from "@/components/ProductGrid";
import { apolloClient } from "./lib/apollo-client";
import { GetProductsDocument } from "@/gql/graphql";
import Hero from "@/components/Hero";
import FilterPills from "@/components/FIlterPills";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; skip?: string }>;
}) {
  const limit = 50;
  const { category, skip = "0" } = await searchParams;
  const { data } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      limit,
      skip: skip ? parseInt(skip) : 0,
      where: category ? { category: category } : undefined,
    },
  });

  return (
    <>
      <Hero />
      <Suspense>
        <FilterPills />
      </Suspense>
      <ProductGrid products={data?.productCollection?.items ?? []} />
    </>
  );
}

// adding skip as react state in order to increase pagination would work here, but that would make it a client component. in order to keep this a React Server Component, we are appending the filters to the url and reading them in as searchParams
