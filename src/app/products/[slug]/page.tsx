import { apolloClient } from "@/app/lib/apollo-client";
import { GetProductDocument, GetProductSlugsDocument } from "@/gql/graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";

export async function generateStaticParams() {
  const { data } = await apolloClient.query({
    query: GetProductSlugsDocument,
  });

  return (
    data?.productCollection?.items.map((product) => ({
      slug: product?.slug,
    })) ?? []
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await apolloClient.query({
    query: GetProductDocument,
    variables: { slug: slug },
  });
  const product = data?.productCollection?.items[0];
  const descriptionJson = product?.description?.json as Document | undefined;
  console.log("product", product);

  if (!product) return <p>Product Not Found</p>;

  return (
    <div>
      <h1>{product?.name}</h1>
      {descriptionJson && <h2>{documentToReactComponents(descriptionJson)}</h2>}
      <p>${product?.price}</p>
      {product?.imagesCollection?.items?.map((image) => {
        return (
          <Image
            key={image?.url}
            src={image?.url}
            alt={image?.title ?? ""}
            width={200}
            height={300}
          />
        );
      })}
      {product?.variants?.map((variant, i) => {
        return (
          <button key={i} disabled={variant.available}>
            {variant.size || variant.color}
          </button>
        );
      })}
      <button>Add to Cart</button>
    </div>
  );
}
