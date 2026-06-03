"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function ItemSelector({
  product,
  slug,
}: {
  product: any;
  slug: string;
}) {
  const [selectedVariant, setSelectedVariant] = useState(1);

  console.log("product", product);

  return (
    <div className="w-full">
      <div className="flex gap-1.5 flex-wrap pb-3">
        {product.variants.map((variant, i) => (
          <button
            key={i}
            onClick={() => setSelectedVariant(i)}
            disabled={!variant.available}
            className={`border rounded-(--border-radius-md) px-3 py-1.5 text-xs cursor-pointer ${
              !variant.available
                ? "text-(--color-text-tertiary) border-(--color-border-tertiary) line-through cursor-not-allowed"
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
        variantId={
          product.variants[selectedVariant].size ||
          product.variants[selectedVariant].color
        }
        productSlug={slug}
        name={product.name}
        variantLabel={
          product.variants[selectedVariant].size ||
          product.variants[selectedVariant].color
        }
        price={product.price}
        imageUrl={product.imagesCollection.items[0].url}
        available={product.variants[selectedVariant].available}
      />
    </div>
  );
}
