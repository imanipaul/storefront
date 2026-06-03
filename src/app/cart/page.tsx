"use client";
import { selectTotalItems, selectTotalPrice, useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  if (totalItems === 0) {
    return <div>Your cart is Empty</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
      <div className="p-6">
        <h1>Your cart ({totalItems})</h1>
        {items.map((item) => (
          <p key={item.name}>{item.name}</p>
          // <CartItem key={item.variantId} item={item} />
        ))}
      </div>
      <div className="p-6 bg-gray-50">
        <p>Total ${totalPrice}</p>
        {/* <OrderSummary total={totalPrice} /> */}
      </div>
    </div>
  );
}
