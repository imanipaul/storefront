"use client";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { selectTotalItems, selectTotalPrice, useCartStore } from "@/store/cart";
import { GetProductsQuery } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";

type Product = NonNullable<GetProductsQuery["productCollection"]>["items"][number];

export default function CartView({ suggestedProducts }: { suggestedProducts: Product[] }) {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  if (totalItems === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-6">
            <span className="w-6 h-6 border border-gray-400 rounded-sm inline-block" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Looks like you haven&apos;t added anything yet.<br />
            Browse the collection to get started.
          </p>
          <Link
            href="/"
            className="bg-black text-white text-sm font-medium px-8 py-3 rounded-md hover:bg-gray-800"
          >
            Browse products
          </Link>
        </div>

        {suggestedProducts.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-8">
            <h3 className="text-base font-semibold mb-6">You might like</h3>
            <div className="grid grid-cols-3 gap-4">
              {suggestedProducts.slice(0, 3).map((product) => {
                const image = product?.imagesCollection?.items[0];
                return (
                  <Link key={product?.slug} href={`/products/${product?.slug}`} className="block">
                    <div className="w-full aspect-3/4 bg-gray-100 rounded-md overflow-hidden relative mb-2">
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
                    <p className="text-xs text-gray-400 mb-0.5">
                      {product?.category}{product?.featured ? " · Featured" : ""}
                    </p>
                    <p className="text-sm">${product?.price?.toFixed(2)}</p>
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
