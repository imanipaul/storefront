"use client";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { selectTotalItems, selectTotalPrice, useCartStore } from "@/store/cart";
import { GetProductsQuery } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/app/lib/format";

type Product = NonNullable<GetProductsQuery["productCollection"]>["items"][number];

export default function CartView({ suggestedProducts }: { suggestedProducts: Product[] }) {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  if (totalItems === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="w-16 h-16 rounded-full border border-(--color-border-secondary) flex items-center justify-center mb-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-(--color-text-tertiary)"
            >
              <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M8 8H16C19 8 20 11.8899 20 13.5C20 19.5259 18.3966 20.5 12 20.5C5.60338 20.5 4 19.5259 4 13.5C4 11.8899 5 8 8 8Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-sm text-(--color-text-secondary) text-center mb-8">
            Looks like you haven&apos;t added anything yet.<br />
            Browse the collection to get started.
          </p>
          <Link
            href="/"
            className="button button-primary px-8"
          >
            Browse products
          </Link>
        </div>

        {suggestedProducts.length > 0 && (
          <div className="border-t border-(--color-border-secondary) px-6 py-8">
            <h3 className="text-base font-semibold mb-6">You might like</h3>
            <div className="grid grid-cols-3 gap-4">
              {suggestedProducts.slice(0, 3).map((product) => {
                const image = product?.imagesCollection?.items[0];
                return (
                  <Link key={product?.slug} href={`/products/${product?.slug}`} className="block">
                    <div className="w-full aspect-3/4 bg-(--color-background-secondary) rounded-(--border-radius-md) overflow-hidden relative mb-2">
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={image.title ?? product?.name ?? ""}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium">{product?.name}</p>
                    <p className="text-xs text-(--color-text-tertiary) mb-0.5">
                      {product?.category}{product?.featured ? " · Featured" : ""}
                    </p>
                    <p className="text-sm">{formatPrice(product?.price)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
      <CartItem totalItems={totalItems} items={items} />
      <OrderSummary totalPrice={totalPrice} />
    </div>
  );
}
