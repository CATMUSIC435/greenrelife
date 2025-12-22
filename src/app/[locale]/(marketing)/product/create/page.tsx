'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { parseLatLng } from '@/lib/utils';
import { formatDatePretty } from '@/utils/format-date-pretty';
import MapLocationPicker from '../../_components/map-location-picker';

export default function CreateProductPage() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [isFix, setIsFix] = useState(false);
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('10.8000,106.6667');

  const WP_API = 'https://greenrelife.dxmd.vn/wp-json';

  // Upload ảnh -> trả về ID ảnh trong WP
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);

    const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wp/v2/media', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dyZWVucmVsaWZlLmR4bWQudm4iLCJpYXQiOjE3NjYzNzUxMDEsIm5iZiI6MTc2NjM3NTEwMSwiZXhwIjoxNzY2OTc5OTAxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.woJBzu7oYMq4LJd6-YwQ9oUR9I1Gzmr_Y4pKGr-C0L0`,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
      body: form,
    });

    const data = await res.json();
    return data;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 1. Upload tất cả ảnh
      const imageIds = [];
      for (const img of images) {
        const media = await uploadImage(img);
        imageIds.push({ id: media.id }); // WooCommerce chỉ cần { id: number }
      }
      const featuredMediaId = imageIds.length ? imageIds[0]?.id : undefined;
      // 2. Gửi API tạo sản phẩm
      const payload = {
        name,
        regular_price: price,
        description: desc,
        short_description: shortDesc,
        images: imageIds,
        featured_media: featuredMediaId,
        status: 'publish',
        categories: [{ id: isFix ? 32 : 20 }],
        meta_data: [
          { key: '_creator_name', value: user?.emailAddresses[0]?.emailAddress },
          { key: '_product_location', value: location },
        ],
      };

      const res = await fetch(`${WP_API}/user/v1/products`, {
        method: 'POST',
        headers: {
          'Authorization':
              `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dyZWVucmVsaWZlLmR4bWQudm4iLCJpYXQiOjE3NjYzNzUxMDEsIm5iZiI6MTc2NjM3NTEwMSwiZXhwIjoxNzY2OTc5OTAxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.woJBzu7oYMq4LJd6-YwQ9oUR9I1Gzmr_Y4pKGr-C0L0`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      await res.json();
      toast('Tạo sản phẩm thành công', {
        description: `${formatDatePretty(new Date())}`,
      });
      window.location.href = `/product`;
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto space-y-6 rounded-lg px-4 pt-2 pb-20 shadow-md">
      <h1 className="w-full text-center text-2xl font-bold text-white">Đăng sản phẩm</h1>

      {/* Tên sản phẩm */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-white">Tên sản phẩm</Label>
        <Input
          id="name"
          placeholder="Nhập tên sản phẩm"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="name" className="text-white">Loại</Label>
        <Button className="w-full bg-blue-600" onClick={() => setIsFix(prev => !prev)}>{isFix ? 'Sữa chữa' : 'Bán'}</Button>
      </div>

      {/* Giá sản phẩm */}
      <div className="space-y-1">
        <Label htmlFor="price" className="text-white">Giá</Label>
        <Input
          id="price"
          type="number"
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      {/* Mô tả ngắn */}
      <div className="space-y-1">
        <Label htmlFor="shortDesc" className="text-white">Mô tả ngắn</Label>
        <Textarea
          id="shortDesc"
          placeholder="Nhập mô tả ngắn"
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Giá sản phẩm */}
      <div className="space-y-1">
        <Label htmlFor="product-location" className="text-white">Vị trí sản phẩm (lat,lng)</Label>
        <MapLocationPicker
          value={parseLatLng(location)}
          onChange={pos => setLocation(pos)}
          height="450px"
        />

        <Input
          id="product-location"
          placeholder="Nhập tọa độ ví dụ: 10.8000,106.6667"
          disabled
          value={location}
        />
      </div>

      {/* Mô tả dài */}
      <div className="space-y-1">
        <Label htmlFor="desc" className="text-white">Mô tả chi tiết</Label>
        <Textarea
          id="desc"
          placeholder="Nhập mô tả chi tiết"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Upload ảnh */}
      <div className="space-y-1">
        <Label htmlFor="images" className="text-white">Ảnh sản phẩm</Label>
        <Input
          id="images"
          type="file"
          multiple
          onChange={e => setImages(Array.from(e.target.files || []))}
          className="cursor-pointer"
        />
        {images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <span
                key={idx}
                className="rounded bg-green-100 px-2 py-1 text-sm text-green-800"
              >
                {img.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Button submit */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Đang đăng...' : 'Đăng sản phẩm'}
      </Button>
    </div>
  );
}
