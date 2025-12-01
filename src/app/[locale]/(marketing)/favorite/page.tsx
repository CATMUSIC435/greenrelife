'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type WooProduct = {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  short_description: string;
};

export default function FavoriteProducts() {
  const { user } = useUser();
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Gọi WooCommerce API để lấy thông tin sản phẩm theo ID
  useEffect(() => {
    const loadWooProducts = async () => {
      const resFavorites = await fetch('/api/favorites' + `?user_id=${user?.id}`);
      const dataFavorites = await resFavorites.json();

      const favorites = dataFavorites.map((f: any) => Number(f.product_id));

      const wooUrl = `https://greenrelife.dxmd.vn/wp-json/wc/v3/products?include=${favorites.join(',')}`;

      const res = await fetch(wooUrl, {
        headers: {
          Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
        },
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    loadWooProducts();
  }, []);

  if (loading) {
    return <p className="p-5 text-gray-500">Đang tải...</p>;
  }

  if (products.length === 0) {
    return (
      <p className="p-5 text-gray-500">
        Bạn chưa yêu thích sản phẩm nào!
      </p>
    );
  }

  return (
    <div className="grid gap-6 p-6 md:grid-cols-3">
      {products.map(p => (
        <div
          key={p.id}
          className="rounded-xl border bg-transparent p-4 shadow-md backdrop-blur-md transition hover:shadow-lg"
        >
          <div className="grid grid-cols-4 gap-2">
            <div className="flex h-full items-center">
              <Image
                height={1080}
                width={1920}
                src={p.images?.[0]?.src ?? ''}
                alt={p.name}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>

            <h2 className="col-span-3 mt-2 line-clamp-3 text-sm">{p.name}</h2>
          </div>

          <div className="mt-2 text-right font-bold">
            {p.price ? `${p.price}₫` : 'Liên hệ'}
          </div>

          <button type="button" className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600">
            Xóa khỏi yêu thích
          </button>
        </div>
      ))}
    </div>
  );
}
