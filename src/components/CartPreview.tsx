"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/app/lib/format";
import { selectTotalItems, selectTotalPrice, useCartStore } from "@/store/cart";
import { useCartPreviewStore } from "@/store/cartPreview";

const AUTO_HIDE_MS = 5000;

export default function CartPreview() {
  const { open, lastAddedId, hide } = useCartPreviewStore();
  const item = useCartStore((state) =>
    state.items.find((i) => i.variantId === lastAddedId),
  );
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const [hovered, setHovered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close after navigating. This updates a shared store, so it has to
  // happen in an effect rather than during render.
  const pathname = usePathname();
  useEffect(() => {
    hide();
  }, [pathname, hide]);

  // Buttons inside the panel close it while the pointer is still over it,
  // so clear the hover flag too or the next preview would never auto-hide
  const close = () => {
    setHovered(false);
    hide();
  };

  // Auto-hide, paused while the pointer or focus is inside the panel
  useEffect(() => {
    if (!open || hovered) return;
    const timer = setTimeout(hide, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [open, hovered, lastAddedId, hide]);

  // Close on Escape or a click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, hide]);

  return (
    <>
      {/* Announces additions to screen readers */}
      <p role="status" className="sr-only">
        {open && item ? `Added ${item.name}, ${item.variantLabel}, to cart` : ""}
      </p>

      {open && item && (
        <div
          ref={panelRef}
          aria-label="Added to cart"
          role="region"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="absolute right-0 top-full mt-2 z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-(--border-radius-lg) border border-(--color-border-secondary) bg-(--color-background-primary) p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-(--color-text-primary)">
              Added to cart ✓
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="button button-tertiary button-icon size-7"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="w-14 h-16 shrink-0 rounded-(--border-radius-md) overflow-hidden bg-(--color-background-secondary)">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt=""
                  width={56}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate">{item.name}</p>
              <p className="text-xs text-(--color-text-secondary)">
                {item.variantLabel} · Qty {item.quantity}
              </p>
              <p className="text-[13px] mt-1">{formatPrice(item.price)}</p>
            </div>
          </div>

          <div className="flex justify-between text-xs text-(--color-text-secondary) mb-3">
            <span>
              Cart subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
            <span className="text-(--color-text-primary) font-medium">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={close}
              className="button button-secondary button-sm"
            >
              Keep shopping
            </button>
            <Link href="/cart" className="button button-primary button-sm">
              View cart
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
