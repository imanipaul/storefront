"use client";
import { selectTotalItems, useCartStore } from "@/store/cart";
import Link from "next/link";
import CartPreview from "./CartPreview";

export default function CartBadge() {
  const totalItems = useCartStore(selectTotalItems);

  const label =
    totalItems === 0
      ? "Bag"
      : `Bag, ${totalItems} ${totalItems === 1 ? "item" : "items"}`;

  return (
    <div className="relative">
      <Link
        href="/cart"
        className="button button-tertiary button-sm px-2.5 gap-1.5 text-(--color-text-primary)"
        aria-label={label}
      >
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M8 8H16C19 8 20 11.8899 20 13.5C20 19.5259 18.3966 20.5 12 20.5C5.60338 20.5 4 19.5259 4 13.5C4 11.8899 5 8 8 8Z" />
        </svg>
        <span className="hidden sm:inline" aria-hidden="true">
          Bag
        </span>
        {totalItems > 0 && (
          <span
            aria-hidden="true"
            className="badge badge-neutral badge-xs rounded-full min-w-4 h-4 px-1 text-[10px] font-semibold"
          >
            {totalItems}
          </span>
        )}
      </Link>
      <CartPreview />
    </div>
  );
}
