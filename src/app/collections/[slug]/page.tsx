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

  if (!collection) return <p>Collection Not Found</p>;

  return (
    <div>
      <h1>{collection?.title}</h1>
      <Image
        src={collection.heroImage?.url}
        alt={collection.heroImage?.title}
        width={collection.heroImage?.width}
        height={collection.heroImage?.height}
      />
      {descriptionJson && <h2>{documentToReactComponents(descriptionJson)}</h2>}
      <ProductGrid products={collection?.productsCollection?.items ?? {}} />
    </div>
  );
}
