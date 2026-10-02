import { apolloClient } from "@/app/lib/apollo-client";
import ProductGrid from "@/components/ProductGrid";
import {
  GetCollectionDocument,
  GetCollectionSlugsDocument,
} from "@/gql/graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

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

  if (!collection)
    return (
      <p className="px-5 md:px-10 py-8 text-(--color-text-secondary)">
        Collection not found
      </p>
    );

  const products = collection?.productsCollection?.items ?? [];

  return (
    <div className="px-5 md:px-10 pt-6 md:pt-8 pb-14">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: collection.title ?? "" }]}
      />

      {/* Collection hero */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-end pt-3 pb-6 mb-6 border-b border-(--color-border-secondary)">
        {/* Title, count and description */}
        <div className="flex flex-col gap-4 md:pb-1">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <h1 className="type-display text-[56px] md:text-[64px]">
              {collection.title}
            </h1>
            <p className="text-[13px] text-(--color-text-secondary) pb-1">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          {descriptionJson && (
            <div className="text-sm leading-relaxed text-(--color-text-secondary) max-w-md [&_p]:m-0">
              {documentToReactComponents(descriptionJson)}
            </div>
          )}
        </div>

        {/* Hero image */}
        {collection.heroImage?.url && (
          <div className="relative aspect-video rounded-xs overflow-hidden bg-(--color-background-secondary)">
            <Image
              src={collection.heroImage.url}
              alt={collection.heroImage.title ?? collection.title ?? ""}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
