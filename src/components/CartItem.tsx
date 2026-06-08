import Image from "next/image";
import { RemoveFromCartButton, UpdateQuantityCartButton } from "./CartButtons";
import { CartItem as CartItemType } from "@/store/cart";

export default function CartItem({
  totalItems,
  items,
}: {
  totalItems: number;
  items: CartItemType[];
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your cart ({totalItems})</h1>
      <div className="divide-y divide-gray-200">
        {items.map((item, i) => (
          <div className="flex gap-5 py-6" key={i}>
            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="font-medium text-base">{item.name}</p>
              <p className="text-sm text-gray-500 mb-4">{item.variantLabel}</p>
              <div className="flex items-center gap-3">
                <UpdateQuantityCartButton
                  sign="-"
                  variantId={item.variantId}
                  quantity={item.quantity}
                />
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <UpdateQuantityCartButton
                  sign="+"
                  variantId={item.variantId}
                  quantity={item.quantity}
                />
              </div>
              <div className="mt-3">
                <RemoveFromCartButton variantId={item.variantId} />
              </div>
            </div>
            <div className="text-base font-medium flex-shrink-0">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
