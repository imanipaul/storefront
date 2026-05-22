import { GetProductsQuery } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";

type Product = NonNullable<
  GetProductsQuery["productCollection"]
>["items"][number];

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => {
        const image = product?.imagesCollection?.items[0];
        return (
          <div
            key={product?.slug}
            className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Link
              href={`/products/${product?.slug}`}
              className="flex flex-1 flex-col"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.title ?? product?.name ?? ""}
                    width={200}
                    height={300}
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
                <p className="text-sm font-medium text-gray-900">
                  {product?.name}
                </p>
                <p className="text-xs text-gray-400">{product?.category}</p>
                <p className="mt-auto pt-2 text-sm text-gray-900">
                  ${product?.price?.toFixed(2)}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
