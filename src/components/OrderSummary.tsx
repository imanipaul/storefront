import Link from "next/link";

export default function OrderSummary({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="p-6 bg-gray-50">
      <p className="text-xl font-bold">Order Summary</p>
      <div id="promo-code-container" className="flex justify-between mt-5">
        <input
          placeholder="Promo Code"
          disabled
          className="border"
          name="promo"
          id="promo"
        />
        <button className="rounded-sm border w-30">Apply</button>
      </div>

      <div id="totals-container" className="mt-5">
        <div id="subtotals-container" className="flex justify-between">
          <p className="text-base">Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <div id="shipping-container" className="flex justify-between">
          <p className="text-base">Shipping</p>
          <p>Calculated at Checkout</p>
        </div>
        <div id="tax-container" className="flex justify-between">
          <p className="text-base">Subtotal</p>
          <p>Calculated at Checkout</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <p className="text-base">Total</p>
        <p>${totalPrice}</p>
      </div>
      <div className="flex justify-between flex-col mt-5">
        <button className="border rounded-md mb-5 h-10">
          Proceed to Checkout
        </button>
        <Link
          href="/"
          className="border rounded-md text-center h-10 inline-block py-2"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
