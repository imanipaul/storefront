"use client";
import { useState } from "react";
import { AddToCartButton } from "./CartButtons";

export type ProductVariant = {
  size?: string;
  color?: string;
  available?: boolean;
};

type ProductWithVariants = {
  name: string | null;
  price: number | null;
  variants: ProductVariant[];
  imagesCollection: {
    items: Array<{ url: string | null } | null>;
  } | null;
};

export default function ItemSelector({
  product,
  slug,
}: {
  product: ProductWithVariants;
  slug: string;
}) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const variant =
    selectedVariant === null ? undefined : product.variants[selectedVariant];
  const variantLabel = variant?.size ?? variant?.color ?? "";
  const imageUrl = product.imagesCollection?.items[0]?.url ?? "";

  const soldOut = !product.variants.some((v) => v.available);
  const optionName = product.variants.some((v) => v.size) ? "size" : "color";
  const disabledLabel = soldOut
    ? "Out of stock"
    : !variant
      ? `Select a ${optionName}`
      : !variant.available
        ? "Out of stock"
        : undefined;

  return (
    <div className="w-full">
      <div className="flex gap-1.5 flex-wrap pb-3">
        {product.variants.map((variant, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedVariant(i)}
            disabled={!variant.available}
            aria-pressed={i === selectedVariant}
            className={`border rounded-(--border-radius-md) px-3 py-1.5 text-xs cursor-pointer ${
              !variant.available
                ? "text-(--color-text-tertiary) border-(--color-border-secondary) line-through cursor-not-allowed"
                : i == selectedVariant
                  ? "bg-(--color-text-primary) text-(--color-background-primary) border-(--color-text-primary)"
                  : "border-(--color-border-secondary) text-(--color-text-primary)"
            }`}
          >
            {variant.size || variant.color}
          </button>
        ))}
      </div>

      <AddToCartButton
        variantId={`${slug}-${variantLabel}`}
        productSlug={slug}
        name={product.name ?? ""}
        variantLabel={variantLabel}
        price={product.price ?? 0}
        imageUrl={imageUrl}
        disabledLabel={disabledLabel}
      />
    </div>
  );
}
