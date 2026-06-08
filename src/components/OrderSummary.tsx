import Link from "next/link";

export default function OrderSummary({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="p-8 bg-gray-50">
      <p className="text-xl font-bold mb-6">Order summary</p>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Promo code"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white"
          name="promo"
          id="promo"
        />
        <button className="border border-gray-300 rounded-md px-5 py-2 text-sm bg-white font-medium hover:bg-gray-50">
          Apply
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-gray-500">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span className="text-gray-500">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full border border-gray-300 rounded-md py-3 text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
          Proceed to checkout
          <span className="w-4 h-4 border border-current rounded-sm inline-block" />
        </button>
        <Link
          href="/"
          className="w-full border border-gray-300 rounded-md py-3 text-sm font-medium text-center hover:bg-gray-100"
        >
          Continue shopping
        </Link>
      </div>

      <div className="flex justify-between mt-8 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 border border-current rounded-sm inline-block" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 border border-current rounded-sm inline-block" />
          <span>Free over $200</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 border border-current rounded-sm inline-block" />
          <span>30-day returns</span>
        </div>
      </div>
    </div>
  );
}
