import Link from "next/link";
import { formatPrice } from "@/app/lib/format";
import type { ReactNode } from "react";

const FREE_SHIPPING_THRESHOLD = 200;

function Icon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

export default function OrderSummary({ totalPrice }: { totalPrice: number }) {
  const freeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="p-8 bg-(--color-background-secondary)">
      <p className="text-xl font-bold mb-6">Order summary</p>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Promo code"
          className="flex-1 min-w-0 border border-(--color-border-secondary) rounded-(--border-radius-md) px-4 py-2 text-sm bg-(--color-background-primary)"
          name="promo"
          id="promo"
        />
        <button
          type="button"
          className="button button-secondary button-sm bg-(--color-background-primary)"
        >
          Apply
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          {freeShipping ? (
            <span>Free</span>
          ) : (
            <span className="text-(--color-text-secondary)">Calculated at checkout</span>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span className="text-(--color-text-secondary)">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-(--color-border-tertiary) pt-4 mb-6">
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button type="button" className="button button-primary w-full">
          Proceed to checkout
          <Icon size={16}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </Icon>
        </button>
        <Link
          href="/"
          className="button button-secondary w-full"
        >
          Continue shopping
        </Link>
      </div>

      <div className="flex justify-between gap-3 mt-8 text-xs text-(--color-text-secondary)">
        <div className="flex items-center gap-1.5">
          <Icon size={14}>
            <rect x="3" y="10" width="18" height="12" rx="2" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
            <circle cx="12" cy="16" r="1" />
          </Icon>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon size={14}>
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </Icon>
          <span>Free over ${FREE_SHIPPING_THRESHOLD}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon size={14}>
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </Icon>
          <span>30-day returns</span>
        </div>
      </div>
    </div>
  );
}
