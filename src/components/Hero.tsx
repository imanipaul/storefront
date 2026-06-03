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
  const descriptionJson = heroProduct?.description?.json as
    | Document
    | undefined;
  const images = heroProduct?.imagesCollection?.items ?? [];

  if (!heroProduct) return null;

  return (
    <div className="grid grid-cols-2  min-h-[60vh] overflow-hidden border-b border-(--color-border-tertiary)">
      {/* Image column */}
      <div className="relative min-h-0 bg-[#EDE9E3] flex items-center justify-center border-r border-(--color-border-tertiary) overflow-hidden">
        {images[0]?.url && (
          <Image
            src={images[0].url}
            alt={images[0].title ?? heroProduct.name ?? ""}
            fill
            className="object-cover"
          />
        )}
        <span className="absolute top-3 left-3 bg-(--color-background-primary) border border-(--color-border-tertiary) text-[10px] py-1 px-2 rounded-full text-(--color-text-secondary)">
          ★ Featured
        </span>
      </div>

      {/* Info column */}
      <div className="min-h-0 overflow-y-auto px-5 py-6 flex flex-col justify-center gap-3">
        <p className="text-[10px] tracking-[0.08em] uppercase text-(--color-text-tertiary)">
          Staff pick
        </p>
        <h1 className="text-[22px] font-medium tracking-tight text-(--color-text-primary) leading-tight">
          {heroProduct.name}
        </h1>
        {descriptionJson && (
          <div className="text-xs text-(--color-text-secondary) leading-relaxed">
            {documentToReactComponents(descriptionJson)}
          </div>
        )}
        <p className="text-base font-medium text-(--color-text-primary)">
          ${heroProduct.price}
        </p>

        {/* Image thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-1.5">
            {images.slice(0, 4).map((image, i) => (
              <div
                key={image?.url ?? i}
                className={`w-10 h-12 rounded border overflow-hidden flex items-center justify-center bg-(--color-background-secondary) cursor-pointer ${
                  i === 0
                    ? "border-(--color-border-primary)"
                    : "border-(--color-border-tertiary)"
                }`}
              >
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.title ?? ""}
                    width={40}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${heroProduct.slug}`}
            className="bg-(--color-text-primary) text-(--color-background-primary) py-2 px-[18px] rounded-(--border-radius-md) text-xs font-medium"
          >
            Shop now
          </Link>
          <Link
            href="/?featured=true"
            className="bg-transparent border border-(--color-border-secondary) text-(--color-text-primary) py-2 px-[18px] rounded-(--border-radius-md) text-xs"
          >
            View all featured
          </Link>
        </div>
      </div>
    </div>
  );
}
