'use client';

import { useState } from 'react';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const WP_API = 'https://greenrelife.dxmd.vn/wp-json';

  // Upload ảnh -> trả về ID ảnh trong WP
  const uploadImage = async (file: File, token: string) => {
    const form = new FormData();
    form.append('file', file, file.name);

    const res = await fetch(`${WP_API}/wp/v2/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
      body: form,
    });

    if (!res.ok) {
      throw new Error('Upload ảnh thất bại');
    }

    const data = await res.json();
    return data.id; // ID media
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('wp_token'); // HOẶC Clerk JWT

      if (!token) {
        return;
      }

      // 1. Upload tất cả ảnh
      const imageIds = [];
      for (const img of images) {
        const id = await uploadImage(img, token);
        imageIds.push({ id });
      }

      // 2. Gửi API tạo sản phẩm
      const payload = {
        name,
        regular_price: price,
        description: desc,
        short_description: shortDesc,
        images: imageIds,
      };

      await fetch(`${WP_API}/user/v1/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // const data = await res.json();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Đăng sản phẩm WooCommerce</h1>

      <input
        className="w-full border p-2"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="Giá"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Mô tả"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Mô tả ngắn"
        value={shortDesc}
        onChange={e => setShortDesc(e.target.value)}
      />

      <input
        type="file"
        multiple
        onChange={e => setImages(Array.from(e.target.files || []))}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {loading ? 'Đang đăng...' : 'Đăng sản phẩm'}
      </button>
    </div>
  );
}
