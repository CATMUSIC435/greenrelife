'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/stores/cart';
import { SectionTitle } from '@/components/ui/section-title';
import { FadeIn } from '@/components/ui/fade-in';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, increase, decrease, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-6 py-12">
      <SectionTitle title="Giỏ hàng của bạn" />

      <FadeIn className="space-y-4 mt-8">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border rounded-2xl bg-card">
            <p>Giỏ hàng đang trống.</p>
            <Link href="/product" className="text-primary font-medium mt-2 inline-block hover:underline">
              Tiếp tục mua sắm &rarr;
            </Link>
          </div>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-md"
            >
              <Image
                height={1080}
                width={1920}
                alt={item.name}
                src={item.image}
                className="h-20 w-24 rounded-xl object-cover border border-border/50"
              />

              <div className="flex-1">
                <p className="line-clamp-2 font-medium text-foreground">{item.name}</p>
                <p className="text-sm font-semibold text-primary mt-1">
                  {item.price ? `${Number(item.price).toLocaleString()} ₫` : 'Liên hệ'}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
                    <button
                      type="button"
                      onClick={() => decrease(item.id)}
                      className="p-1 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-foreground active:scale-95"
                    >
                      <Minus className="size-4" />
                    </button>

                    <span className="px-3 text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increase(item.id)}
                      className="p-1 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-foreground active:scale-95"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </FadeIn>

      {items.length > 0 && (
        <FadeIn delay={0.2} className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex w-full items-center justify-between pb-4 text-lg font-semibold border-b border-border">
            <span className="text-muted-foreground">Tổng cộng:</span>
            <span className="text-primary text-xl">
              {items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()} ₫
            </span>
          </div>
          <div className="mt-6 flex justify-end">
            <Link 
              href="/checkout" 
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
            >
              Tiến hành đặt hàng
            </Link>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
