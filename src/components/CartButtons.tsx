"use client";
import { useCartStore } from "@/store/cart";

interface Props {
  variantId: string;
  productSlug: string;
  name: string;
  variantLabel: string;
  price: number;
  imageUrl: string;
  /** When set, the button is disabled and shows this text instead. */
  disabledLabel?: string;
}

export function AddToCartButton({
  variantId,
  productSlug,
  name,
  variantLabel,
  price,
  imageUrl,
  disabledLabel,
}: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem({
      variantId,
      productSlug,
      name,
      variantLabel,
      price,
      imageUrl,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={!!disabledLabel}
      className="w-full bg-(--color-text-primary) text-(--color-background-primary) border-0 py-3 rounded-(--border-radius-md) text-[13px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {disabledLabel ?? "Add To Cart"}
    </button>
  );
}

export function RemoveFromCartButton({ variantId }: { variantId: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  const handleClick = () => {
    removeItem(variantId);
  };

  return (
    <button
      className="border border-gray-300 px-4 h-8 rounded-md text-sm font-medium hover:bg-gray-50"
      onClick={handleClick}
    >
      Remove
    </button>
  );
}

export function UpdateQuantityCartButton({
  sign,
  variantId,
  quantity,
}: {
  sign: string;
  variantId: string;
  quantity: number;
}) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const newQuantity = sign === "-" ? quantity - 1 : quantity + 1;

  const handleClick = () => {
    updateQuantity(variantId, newQuantity);
  };

  return (
    <button
      className="border border-gray-300 w-8 h-8 rounded-md text-sm font-medium hover:bg-gray-50"
      onClick={handleClick}
    >
      {sign}
    </button>
  );
}
