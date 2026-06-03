import { GetProductsQuery } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";

type Product = NonNullable<
  GetProductsQuery["productCollection"]
>["items"][number];

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      className="grid grid-cols-3 gap-[0.5px]"
      style={{ background: "var(--color-border-tertiary)" }}
    >
      {products.map((product) => {
        const image = product?.imagesCollection?.items[0];
        return (
          <Link
            key={product?.slug}
            href={`/products/${product?.slug}`}
            className="bg-(--color-background-primary) block"
          >
            {/* Card image */}
            <div className="w-full aspect-3/4 bg-(--color-background-secondary) flex items-center justify-center relative overflow-hidden">
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.title ?? product?.name ?? ""}
                  fill
                  className="object-cover"
                />
              )}
              {product?.featured && (
                <span className="absolute top-2 left-2 bg-(--color-background-primary) border border-(--color-border-tertiary) text-[10px] py-0.5 px-1.5 rounded-full text-(--color-text-secondary)">
                  Featured
                </span>
              )}
            </div>

            {/* Card info */}
            <div className="px-3 pt-2.5 pb-3.5">
              <p className="text-[13px] font-medium text-(--color-text-primary) mb-0.5">
                {product?.name}
              </p>
              <p className="text-[11px] text-(--color-text-tertiary) mb-1.5">
                {product?.category}
              </p>
              <p className="text-[13px] text-(--color-text-primary)">
                ${product?.price?.toFixed(2)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
