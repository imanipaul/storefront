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
  const descriptionJson = heroProduct?.description?.json as Document | undefined;
  const images = heroProduct?.imagesCollection?.items ?? [];

  if (!heroProduct) return null;

  return (
    <div className="grid grid-cols-2 border-b border-[var(--color-border-tertiary)]">
      {/* Image column */}
      <div className="relative aspect-[4/3] bg-[#EDE9E3] flex items-center justify-center border-r border-[var(--color-border-tertiary)] overflow-hidden">
        {images[0]?.url && (
          <Image
            src={images[0].url}
            alt={images[0].title ?? heroProduct.name ?? ""}
            fill
            className="object-cover"
          />
        )}
        <span className="absolute top-3 left-3 bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] text-[10px] py-1 px-2 rounded-full text-[var(--color-text-secondary)]">
          ★ Featured
        </span>
      </div>

      {/* Info column */}
      <div className="px-5 py-6 flex flex-col justify-center gap-3">
        <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-text-tertiary)]">
          Staff pick
        </p>
        <h1 className="text-[22px] font-medium tracking-tight text-[var(--color-text-primary)] leading-tight">
          {heroProduct.name}
        </h1>
        {descriptionJson && (
          <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {documentToReactComponents(descriptionJson)}
          </div>
        )}
        <p className="text-base font-medium text-[var(--color-text-primary)]">
          ${heroProduct.price}
        </p>

        {/* Image thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-1.5">
            {images.slice(0, 4).map((image, i) => (
              <div
                key={image?.url ?? i}
                className={`w-10 h-12 rounded border overflow-hidden flex items-center justify-center bg-[var(--color-background-secondary)] cursor-pointer ${
                  i === 0
                    ? "border-[var(--color-border-primary)]"
                    : "border-[var(--color-border-tertiary)]"
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
            className="bg-[var(--color-text-primary)] text-[var(--color-background-primary)] py-2 px-[18px] rounded-[var(--border-radius-md)] text-xs font-medium"
          >
            Shop now
          </Link>
          <Link
            href="/?category=Featured"
            className="bg-transparent border border-[var(--color-border-secondary)] text-[var(--color-text-primary)] py-2 px-[18px] rounded-[var(--border-radius-md)] text-xs"
          >
            View all featured
          </Link>
        </div>
      </div>
    </div>
  );
}
