import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/app/lib/format";

// Only the fields a card renders, so any product query can feed the grid
type Product = {
  name?: string | null;
  slug?: string | null;
  price?: number | null;
  category?: string | null;
  featured?: boolean | null;
  imagesCollection?: {
    items: Array<{ url: string | null; title: string | null } | null>;
  } | null;
} | null;

// The feature tile sits at the start of the second row on desktop
const FEATURE_POSITION = 4;

export default function ProductGrid({
  products,
  feature,
}: {
  products: Product[];
  /** Optional wide tile (e.g. a campaign) placed among the products */
  feature?: ReactNode;
}) {
  const featureIndex = Math.min(FEATURE_POSITION, products.length);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7">
      {products.map((product, i) => {
        const image = product?.imagesCollection?.items[0];
        return (
          <Fragment key={product?.slug}>
            {i === featureIndex && feature}
            <Link href={`/products/${product?.slug}`} className="group block">
              {/* Card image */}
              <div className="w-full aspect-4/5 rounded-xs bg-(--color-background-secondary) relative overflow-hidden">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.title ?? product?.name ?? ""}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                )}
                {product?.featured && (
                  <span className="absolute top-2.5 left-2.5 rounded-xs bg-(--color-background-primary) px-1.5 py-0.5 text-[11px] font-medium text-(--color-text-primary)">
                    Staff pick
                  </span>
                )}
              </div>

              {/* Card info */}
              <div className="pt-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-medium text-(--color-text-primary)">
                    {product?.name}
                  </p>
                  <p className="text-[13px] text-(--color-text-primary) shrink-0">
                    {formatPrice(product?.price)}
                  </p>
                </div>
                {product?.category && (
                  <p className="text-xs text-(--color-text-secondary) mt-0.5">
                    {product.category}
                  </p>
                )}
              </div>
            </Link>
          </Fragment>
        );
      })}
      {featureIndex === products.length && feature}
    </div>
  );
}
