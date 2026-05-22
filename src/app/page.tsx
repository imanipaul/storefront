import ProductGrid from "@/components/ProductGrid";
import { apolloClient } from "./lib/apollo-client";
import { GetProductsDocument } from "@/gql/graphql";
import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; skip?: string }>;
}) {
  const limit = 5;
  const { category, skip = "0" } = await searchParams;
  const { data } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      limit,
      skip: skip ? parseInt(skip) : 0,
      where: category ? { category: category } : undefined,
    },
  });

  const total = data?.productCollection?.total ?? 0;

  return (
    <div>
      <ProductGrid
        products={data?.productCollection?.items ?? []}
        total={data?.productCollection?.total ?? 0}
      />
      {total > parseInt(skip) + limit ? (
        <Link href={`/?skip=${skip ? parseInt(skip) + 5 : 5}`}>Load Next</Link>
      ) : (
        <Link href={`/?skip=${skip ? parseInt(skip) - 5 : 0}`}>
          Load Previous
        </Link>
      )}
    </div>
  );
}

// adding skip as react state in order to increase pagination would work here, but that would make it a client component. in order to keep this a React Server Component, we are appending the filters to the url and reading them in as searchParams
