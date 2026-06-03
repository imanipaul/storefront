"use client";
import { useCartStore } from "@/store/cart";

interface Props {
  variantId: string;
  productSlug: string;
  name: string;
  variantLabel: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

export default function AddToCartButton({
  variantId,
  productSlug,
  name,
  variantLabel,
  price,
  imageUrl,
  available,
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
      disabled={!available}
      className="w-full bg-(--color-text-primary) text-(--color-background-primary) border-0 py-3 rounded-(--border-radius-md) text-[13px] font-medium cursor-pointer"
    >
      {available ? "Add To Cart" : "Out of Stock"}
    </button>
  );
}
