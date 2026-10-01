const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // Whole-dollar prices drop the cents ($245); others keep them ($49.50)
  trailingZeroDisplay: "stripIfInteger",
});

export function formatPrice(amount: number | null | undefined) {
  return priceFormatter.format(amount ?? 0);
}

export const FREE_SHIPPING_THRESHOLD = 200;
