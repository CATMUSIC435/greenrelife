'use client';

import { useUser } from '@clerk/nextjs';
import { Camera, Loader2, MapPin, Tag, Type } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { parseLatLng } from '@/lib/utils';
import { formatDatePretty } from '@/utils/format-date-pretty';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MapLocationPicker = dynamic(
  () => import('../../_components/map-location-picker'),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full rounded-xl" />
  }
);
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
  const TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dyZWVucmVsaWZlLmR4bWQudm4iLCJpYXQiOjE3ODA4ODc1ODMsIm5iZiI6MTc4MDg4NzU4MywiZXhwIjoxNzgxNDkyMzgzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.x-vISC87OUnGqteMzoqvDtbgdz3r-uwPKU3yEOIQQSI`;

  // Upload ảnh -> trả về ID ảnh trong WP
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);

    const res = await fetch(`${WP_API}/wp/v2/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
      body: form,
    });

    if (!res.ok) {
      throw new Error(`Upload ảnh thất bại: ${file.name}`);
    }

    return await res.json();
  };

  const handleSubmit = async () => {
    if (!name || !price || images.length === 0) {
      toast.error('Vui lòng điền đầy đủ tên, giá và chọn ít nhất 1 ảnh sản phẩm.');
      return;
    }

    try {
      setLoading(true);

      const imageIds = [];
      for (const img of images) {
        const media = await uploadImage(img);
        imageIds.push({ id: media.id });
      }
      const featuredMediaId = imageIds.length ? imageIds[0]?.id : undefined;

      const payload = {
        name,
        regular_price: price,
        description: desc,
        short_description: shortDesc,
        images: imageIds,
        featured_media: featuredMediaId,
        status: 'publish',
        categories: [{ id: isFix ? 32 : 20 }],
        stock_quantity: 1,
        manage_stock: true,
        stock_status: 'instock',
        meta_data: [
          { key: '_creator_name', value: user?.emailAddresses[0]?.emailAddress },
          { key: '_product_location', value: location },
        ],
      };

      const res = await fetch(`${WP_API}/user/v1/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Đăng sản phẩm thất bại.');
      }

      await res.json();
      toast.success('Tạo sản phẩm thành công', {
        description: `${formatDatePretty(new Date())}`,
      });
      window.location.href = `/product`;
    } catch (err: any) {
      console.error(err);
      toast.error('Có lỗi xảy ra', {
        description: err.message || 'Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-8 rounded-2xl border border-white/10 bg-zinc-950/40 p-6 pb-20 shadow-2xl backdrop-blur-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Đăng sản phẩm mới</h1>
        <p className="text-sm text-zinc-400">Điền thông tin chi tiết để đăng bán hoặc cung cấp dịch vụ sửa chữa.</p>
      </div>

      <div className="space-y-6">
        {/* Tên sản phẩm */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-zinc-200">
            <Type className="h-4 w-4 text-emerald-400" />
            {' '}
            Tên sản phẩm
          </Label>
          <Input
            id="name"
            placeholder="Nhập tên sản phẩm"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Loại */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-zinc-200">
            <Tag className="h-4 w-4 text-emerald-400" />
            {' '}
            Loại dịch vụ
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={!isFix ? 'default' : 'outline'}
              className={`w-full transition-all duration-300 ${!isFix ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700' : 'border-white/10 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              onClick={() => setIsFix(false)}
            >
              Bán sản phẩm
            </Button>
            <Button
              type="button"
              variant={isFix ? 'default' : 'outline'}
              className={`w-full transition-all duration-300 ${isFix ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-700' : 'border-white/10 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              onClick={() => setIsFix(true)}
            >
              Dịch vụ Sửa chữa
            </Button>
          </div>
        </div>

        {/* Giá */}
        <div className="space-y-2">
          <Label htmlFor="price" className="flex items-center gap-2 text-zinc-200">
            <Tag className="h-4 w-4 text-emerald-400" />
            {' '}
            Giá (VNĐ)
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Nhập giá sản phẩm"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Mô tả ngắn */}
        <div className="space-y-2">
          <Label htmlFor="shortDesc" className="text-zinc-200">Mô tả ngắn</Label>
          <Textarea
            id="shortDesc"
            placeholder="Nhập mô tả ngắn gọn về sản phẩm"
            value={shortDesc}
            onChange={e => setShortDesc(e.target.value)}
            className="min-h-[80px] resize-none border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Vị trí */}
        <div className="space-y-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4">
          <Label htmlFor="product-location" className="flex items-center gap-2 text-zinc-200">
            <MapPin className="h-4 w-4 text-emerald-400" />
            {' '}
            Vị trí sản phẩm
          </Label>
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-inner">
            <MapLocationPicker
              value={parseLatLng(location)}
              onChange={pos => setLocation(pos)}
              height="300px"
            />
          </div>
          <Input
            id="product-location"
            placeholder="Tọa độ: 10.8000,106.6667"
            readOnly
            value={location}
            className="cursor-not-allowed border-white/10 bg-zinc-950/50 text-zinc-400"
          />
        </div>

        {/* Mô tả chi tiết */}
        <div className="space-y-2">
          <Label htmlFor="desc" className="text-zinc-200">Mô tả chi tiết</Label>
          <Textarea
            id="desc"
            placeholder="Nhập mô tả chi tiết"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="min-h-[120px] resize-none border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Upload ảnh */}
        <div className="space-y-3">
          <Label htmlFor="images" className="flex items-center gap-2 text-zinc-200">
            <Camera className="h-4 w-4 text-emerald-400" />
            {' '}
            Ảnh sản phẩm
          </Label>

          <div className="group relative">
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImages(prev => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
            <div className="flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-zinc-900/50 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-zinc-800/50">
              <Camera className="mb-2 h-8 w-8 text-zinc-500 transition-colors group-hover:text-emerald-400" />
              <p className="text-sm text-zinc-400 group-hover:text-zinc-300">Nhấn hoặc kéo thả ảnh vào đây</p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-white/10 shadow-sm">
                  <img src={URL.createObjectURL(img)} alt="preview" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="h-12 w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-lg font-medium text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-70"
        >
          {loading
            ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang đăng sản phẩm...
                </>
              )
            : (
                'Đăng sản phẩm'
              )}
        </Button>
      </div>
    </div>
  );
}
