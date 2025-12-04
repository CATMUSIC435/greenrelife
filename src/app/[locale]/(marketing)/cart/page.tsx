'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/stores/cart';

export default function CartPage() {
  const { items, increase, decrease, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 w-full rounded-md px-2 py-2 text-2xl font-bold text-white shadow-2xl text-shadow-2xs">Giỏ hàng</h1>

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
              <p className="line-clamp-3 font-medium">{item.name}</p>
              <p className="text-sm">
                {item.price ? `${Number(item.price).toLocaleString()} đ` : 'Liên hệ'}
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
                  className="rounded-md bg-red-400/80 px-3 py-1 text-white shadow-2xs backdrop-blur-md"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-4 text-right">
        <p className="py-2 text-lg font-bold">
          Tổng:
          {items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
          ₫
        </p>
        {items.length
          ? (
              <Link href="/checkout" className="rounded-sm bg-blue-600 px-4 py-2 text-white shadow-2xs backdrop-blur-md">
                Đặt hàng
              </Link>
            )
          : null}
      </div>
    </div>
  );
}
