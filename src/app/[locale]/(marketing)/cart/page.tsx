'use client';

import Image from 'next/image';
import { useCart } from '@/stores/cart';

export default function CartPage() {
  const { items, increase, decrease, removeItem, total } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Giỏ hàng</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <Image
              height={1080}
              width={1920}
              alt=""
              src={item.image}
              className="h-16 w-20 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">
                {item.price}
                ₫
              </p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decrease(item.id)}
                  className="rounded border px-2 py-1"
                >
                  -
                </button>

                <span className="px-3">{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => increase(item.id)}
                  className="rounded border px-2 py-1"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <p className="text-xl font-bold">
          Tổng:
          {total()}
          ₫
        </p>
        <button className="mt-4 rounded-xl bg-green-600 px-5 py-3 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
}
