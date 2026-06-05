"use client";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { selectTotalItems, selectTotalPrice, useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  if (totalItems === 0) {
    return <div>Your cart is Empty</div>;
  }

  console.log("items", items);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_640px]">
      <CartItem totalItems={totalItems} items={items} />
      <OrderSummary totalPrice={totalPrice} />
    </div>
  );
}
