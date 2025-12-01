/* eslint-disable style/multiline-ternary */
// components/ProductClient.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import Attributes from '@/components/molecules/attributes';
import ImageCarousel from '@/components/molecules/image-carousel';
import { useCart } from '@/stores/cart';

type WooProduct = any;

export default function ProductClient({ product }: { product: WooProduct }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCart(s => s.addItem);
  const { user } = useUser();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const images = product.images ?? [];

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="mb-4">
        <ImageCarousel
          images={images}
          selectedIndex={selectedImageIndex}
          onChange={setSelectedImageIndex}
        />
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {images.map((img: any, idx: number) => (
            <button
              key={img.id ?? idx}
              className={`h-20 w-20 overflow-hidden rounded-md border ${selectedImageIndex === idx ? 'ring-2 ring-blue-400' : 'border-gray-200'}`}
              onClick={() => setSelectedImageIndex(idx)}
              type="button"
            >
              <Image src={img.src} alt={product.name} width={80} height={80} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <Attributes
        attributes={product.attributes ?? []}
        selectedOptions={selectedOptions}
        onChange={handleOptionChange}
      />

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center rounded-md border">
          <button type="button" className="px-3 py-1" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <input
            className="w-16 text-center"
            value={quantity}
            onChange={(e) => {
              const v = Number(e.target.value) || 1;
              setQuantity(Math.max(1, Math.floor(v)));
            }}
          />
          <button type="button" className="px-3 py-1" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button
          type="button"
          className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          onClick={() => {
            setLoadingAdd(true);
            addItem({
              id: product.id,
              name: product.name,
              price: Number(product.price),
              image: product.images?.[0]?.src,
              quantity: 1,
            });

            setLoadingAdd(false);
          }}
          disabled={loadingAdd}
        >
          {loadingAdd ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
        </button>
      </div>
      { user ? (
        <button
          className="mt-2 w-full rounded-lg bg-lime-600 px-4 py-2 text-white"
          type="button"
          onClick={async () => {
            const res = await fetch('/api/chat/create', {
              method: 'POST',
              body: JSON.stringify({
                user_id: user?.emailAddresses[0]?.emailAddress,
                seller_id: product?.creator ? product.creator : 'phuongdongiot@gmail.com',
                product_id: product.id,
              }),
            });

            const data = await res.json();

            if (data.id) {
            // Redirect tới phòng chat
              window.location.href = `/chat/${data.id}`;
            }
          }}
        >
          Nhắn tin người bán
        </button>
      ) : null}
    </div>
  );
}
