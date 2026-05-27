import { apolloClient } from "@/app/lib/apollo-client";
import { GetProductsDocument } from "@/gql/graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const { data } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      limit: 1,
      where: { featured: true },
    },
  });

  const heroProduct = data?.productCollection?.items[0];
  console.log("heroProduct", heroProduct);
  const descriptionJson = heroProduct?.description?.json as
    | Document
    | undefined;

  return (
    <div className="flex pb-10 h-150">
      <Image
        src={heroProduct?.imagesCollection?.items[0]?.url}
        alt={heroProduct?.imagesCollection?.items[0]?.title}
        width={300}
        height={200}
        className="object-cover w-7/12 "
      />
      <div className="flex flex-col pl-10">
        <h1 className="text-3xl">{heroProduct?.name}</h1>
        {descriptionJson && (
          <div>{documentToReactComponents(descriptionJson)}</div>
        )}
        <h2>{heroProduct?.price}</h2>
        <Link href={`/products/${heroProduct?.slug}`}>Shop Now</Link>
      </div>
    </div>
  );
}
