'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';

type WooProduct = {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  short_description: string;
};

export default function FavoriteProducts() {
  const { user, isLoaded } = useUser();
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const loadWooProducts = async () => {
      try {
        const resFavorites = await fetch('/api/favorites' + `?user_id=${user.id}`);
        const dataFavorites = await resFavorites.json();
        const favorites = dataFavorites.map((f: any) => Number(f.product_id));

        if (favorites.length !== 0) {
          const wooUrl = `https://greenrelife.dxmd.vn/wp-json/wc/v3/products?include=${favorites.join(',')}`;
          const res = await fetch(wooUrl, {
            headers: {
              Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
            },
          });
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWooProducts();
  }, [user, isLoaded]);

  const removeFavourite = async (productId: number) => {
    if (!user) return;
    await fetch('/api/favorites/remove', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, user_id: user.id }),
    });
    setProducts(prev => prev.filter(item => item.id !== productId));
  };

  if (!isLoaded || loading) {
    return (
      <div className="mx-auto max-w-4xl p-6 py-12">
        <SectionTitle title="Sản phẩm yêu thích" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6 py-12">
      <FadeIn>
        <SectionTitle title="Sản phẩm yêu thích" />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 space-y-4">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground shadow-sm">
            Bạn chưa yêu thích sản phẩm nào.
          </div>
        ) : (
          products.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
                {p.images?.[0]?.src ? (
                  <Image
                    fill
                    src={p.images[0].src}
                    alt={p.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>

              <div className="flex-1">
                <h2 className="line-clamp-2 text-base font-semibold text-foreground">{p.name}</h2>
                <div className="mt-2 text-sm font-bold text-primary">
                  {p.price ? `${Number(p.price).toLocaleString()} ₫` : 'Liên hệ'}
                </div>
              </div>

              <button
                onClick={() => removeFavourite(p.id)}
                type="button"
                title="Xóa khỏi yêu thích"
                className="ml-auto p-3 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive rounded-full"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ))
        )}
      </FadeIn>
    </div>
  );
}
