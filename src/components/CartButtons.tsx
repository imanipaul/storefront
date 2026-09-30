"use client";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cart";
import { useCartPreviewStore } from "@/store/cartPreview";

const ADDED_FEEDBACK_MS = 2000;

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
  const showPreview = useCartPreviewStore((state) => state.show);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

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
    showPreview(variantId);

    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!!disabledLabel}
      className="button button-primary w-full"
    >
      {disabledLabel ?? (justAdded ? "Added ✓" : "Add to cart")}
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
      type="button"
      className="button button-tertiary button-sm -ml-4"
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
      type="button"
      aria-label={sign === "-" ? "Decrease quantity" : "Increase quantity"}
      className="button button-secondary button-icon size-8"
      onClick={handleClick}
    >
      {sign}
    </button>
  );
}
