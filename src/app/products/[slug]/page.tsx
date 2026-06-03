import { apolloClient } from "@/app/lib/apollo-client";
import ItemSelector from "@/components/ItemSelector";
import { GetProductDocument, GetProductSlugsDocument } from "@/gql/graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

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

  if (!product)
    return (
      <p className="p-5 text-(--color-text-secondary)">Product not found</p>
    );

  const images = product?.imagesCollection?.items ?? [];
  const variants = product?.variants ?? [];

  return (
    <div className="grid grid-cols-2">
      {/* Image column */}
      <div className="relative bg-[#EDE9E3] flex items-center justify-center border-r border-(--color-border-tertiary) p-8 aspect-[1/1.05] overflow-hidden">
        {images[0]?.url && (
          <Image
            src={images[0].url}
            alt={images[0].title ?? product.name ?? ""}
            fill
            className="object-contain p-8"
          />
        )}

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-(--color-background-primary) border border-(--color-border-tertiary) text-[10px] py-1 px-2 rounded-full text-(--color-text-secondary)">
            ★ Featured
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
            {images.slice(0, 4).map((image, i) => (
              <div
                key={image?.url ?? i}
                className={`w-9 h-11 rounded overflow-hidden flex items-center justify-center bg-(--color-background-secondary) cursor-pointer border ${
                  i === 0
                    ? "border-(--color-border-primary) border-[1.5px]"
                    : "border-(--color-border-tertiary)"
                }`}
              >
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.title ?? ""}
                    width={36}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info column */}
      <div className="px-5 py-6 flex flex-col gap-3.5 overflow-auto">
        {/* Breadcrumb */}
        <p className="text-[11px] text-(--color-text-tertiary)">
          <Link href="/" className="hover:underline">
            All products
          </Link>
          {product.category && <> › {product.category}</>} › {product.name}
        </p>

        {/* Title + description */}
        <div>
          <h1 className="text-[20px] font-medium tracking-tight text-(--color-text-primary) mb-1.5">
            {product.name}
          </h1>
          {descriptionJson && (
            <div className="text-xs text-(--color-text-secondary) leading-relaxed">
              {documentToReactComponents(descriptionJson)}
            </div>
          )}
        </div>

        {/* Price */}
        <p className="text-[17px] font-medium text-(--color-text-primary)">
          ${product.price}
        </p>

        {/* Variants */}
        {variants.length > 0 && (
          <div>
            <p className="text-[10px] font-medium text-(--color-text-secondary) tracking-wider uppercase mb-1.5">
              Size
            </p>
            <div className="flex gap-1.5 flex-wrap">
              <ItemSelector product={product} />
            </div>
          </div>
        )}

        {/* Add to cart */}
        {/* <button className="w-full bg-[var(--color-text-primary)] text-[var(--color-background-primary)] border-0 py-3 rounded-[var(--border-radius-md)] text-[13px] font-medium cursor-pointer">
          Add to cart
        </button> */}

        {/* Save to wishlist */}
        <button className="w-full bg-transparent border border-(--color-border-secondary) text-(--color-text-primary) py-[11px] rounded-(--border-radius-md) text-xs cursor-pointer flex items-center justify-center gap-1.5">
          ♡ Save to wishlist
        </button>

        {/* Accordion rows */}
        <div>
          <div className="flex justify-between items-center py-2.5 border-t border-(--color-border-tertiary) text-[13px] text-(--color-text-primary) cursor-pointer">
            <span>Materials &amp; care</span>
            <span className="text-(--color-text-tertiary) text-sm">›</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-t border-(--color-border-tertiary) text-[13px] text-(--color-text-primary) cursor-pointer">
            <span>Shipping &amp; returns</span>
            <span className="text-(--color-text-tertiary) text-sm">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
