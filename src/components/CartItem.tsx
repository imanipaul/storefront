import Image from "next/image";

export default function CartItem({
  totalItems,
  items,
}: {
  totalItems: number;
  items: any[];
}) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your cart ({totalItems})</h1>
      {items.map((item, i) => (
        <div className="flex" key={i}>
          <div id="image-container">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={200}
              height={200}
            />
          </div>
          <div id="data-container" className="ml-10 flex flex-col">
            <p className="text-lg">{item.name}</p>
            <p className="text-base mb-10">{item.variantLabel}</p>
            <div>
              <button className="border w-10 rounded-md mr-5">-</button>
              {item.quantity}
              <button className="border w-10 rounded-md ml-5">+</button>
            </div>
            <button className="border w-full h-10 rounded-md">Remove</button>
          </div>
          <div id="price-container" className="ml-50 text-lg">
            ${item.price}
          </div>
        </div>
      ))}
    </div>
  );
}
