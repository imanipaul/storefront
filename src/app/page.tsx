import ProductGrid from "@/components/ProductGrid";
import { apolloClient } from "./lib/apollo-client";
import { GetProductsDocument } from "@/gql/graphql";
import Hero from "@/components/Hero";
import FilterPills from "@/components/FIlterPills";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    skip?: string;
    featured?: string;
  }>;
}) {
  const limit = 50;
  const { category, featured = "false" } = await searchParams;
  const { data } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      limit,
      where: {
        ...(category && { category: category }),
        ...(featured === "true" && { featured: true }),
      },
    },
  });

  console.log("data", data);
  console.log("featured", featured);

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
