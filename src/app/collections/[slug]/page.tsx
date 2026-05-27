import { apolloClient } from "@/app/lib/apollo-client";
import ProductGrid from "@/components/ProductGrid";
import {
  GetCollectionDocument,
  GetCollectionSlugsDocument,
} from "@/gql/graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";

export async function generateStaticParams() {
  const { data } = await apolloClient.query({
    query: GetCollectionSlugsDocument,
  });

  return (
    data?.collectionCollection?.items.map((collection) => ({
      slug: collection?.slug,
    })) ?? []
  );
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await apolloClient.query({
    query: GetCollectionDocument,
    variables: { slug: slug },
  });
  const collection = data?.collectionCollection?.items[0];
  const descriptionJson = collection?.description?.json as Document | undefined;

  if (!collection) return <p className="p-5 text-[var(--color-text-secondary)]">Collection not found</p>;

  const products = collection?.productsCollection?.items ?? [];

  return (
    <div>
      {/* Collection hero */}
      <div className="grid grid-cols-2 border-b border-[var(--color-border-tertiary)]">
        {/* Left: hero image */}
        <div className="aspect-[16/9] bg-[#EDE9E3] flex items-center justify-center border-r border-[var(--color-border-tertiary)] overflow-hidden">
          {collection.heroImage?.url && (
            <Image
              src={collection.heroImage.url}
              alt={collection.heroImage.title ?? collection.title ?? ""}
              width={collection.heroImage.width ?? 800}
              height={collection.heroImage.height ?? 450}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Right: collection info */}
        <div className="px-5 py-6 flex flex-col justify-center gap-2.5">
          <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-text-tertiary)]">
            Collection
          </p>
          <h1 className="text-[20px] font-medium tracking-tight text-[var(--color-text-primary)]">
            {collection.title}
          </h1>
          {descriptionJson && (
            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {documentToReactComponents(descriptionJson)}
            </div>
          )}
          <div className="text-[11px] text-[var(--color-text-tertiary)] flex items-center gap-3">
            <span>{products.length} products</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProductGrid products={products as any} />

      {/* Grid footer */}
      <div className="px-5 py-3 border-t border-[var(--color-border-tertiary)] flex items-center">
        <span className="text-xs text-[var(--color-text-tertiary)]">
          {products.length} {products.length === 1 ? "product" : "products"}
        </span>
      </div>
    </div>
  );
}
