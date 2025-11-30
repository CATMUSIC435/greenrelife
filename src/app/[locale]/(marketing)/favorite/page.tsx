'use client';

import { useUser } from '@clerk/nextjs';
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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Gọi API để lấy danh sách product_id yêu thích
  useEffect(() => {
    const loadFavorites = async () => {
      const res = await fetch('/api/favorites' + `?user_id=${user?.id}`);
      const data = await res.json();

      const productIds = data.map((f: any) => Number(f.product_id));
      setFavorites(productIds);
    };

    loadFavorites();
  }, []);

  // 2. Gọi WooCommerce API để lấy thông tin sản phẩm theo ID
  useEffect(() => {
    if (favorites.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const loadWooProducts = async () => {
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
  }, [favorites]);

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
          className="rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg"
        >
          <img
            src={p.images?.[0]?.src}
            alt={p.name}
            className="h-48 w-full rounded-lg object-cover"
          />

          <h2 className="mt-3 text-lg font-semibold">{p.name}</h2>

          <p
            className="mt-2 line-clamp-2 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: p.short_description }}
          />

          <div className="mt-3 font-bold text-red-500">
            {p.price ? `${p.price}₫` : 'Liên hệ'}
          </div>

          <button className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600">
            Xóa khỏi yêu thích
          </button>
        </div>
      ))}
    </div>
  );
}
