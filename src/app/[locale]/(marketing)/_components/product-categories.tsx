'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFilter } from '@/contexts/filter-context';
import { cn } from '@/lib/utils';

export default function ProductCategories() {
  const { categories, toggleCategory } = useFilter();
  const [listCategories, setListCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          'https://greenrelife.dxmd.vn/wp-json/wc/v3/products/categories',
          {
            headers: {
              Authorization:
                `Basic ${btoa(
                  'ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43',
                )}`,
            },
            cache: 'no-store',
          },
        );

        const data = await res.json();
        setListCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Đang tải danh mục...</p>;
  }

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center gap-2">
          {listCategories.map(cat => (
            <button
              type="button"
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={cn('rounded-lg border border-gray-200 px-4 py-2 shadow-sm transition hover:shadow-md', categories.includes(cat.id) ? 'bg-white/80 backdrop-blur-md shadow-2xs' : '')}
            >
              <p className="font-medium">{cat.name}</p>

              {/* Hiển thị ảnh thumbnail nếu có */}
              {cat.image?.src && (
                <Image
                  height={100}
                  width={100}
                  src={cat.image.src}
                  alt={cat.name}
                  className="mt-2 h-24 w-full rounded-md object-cover"
                />
              )}

              <p className="text-xs">
                {cat.count}
                {' '}
                sản phẩm
              </p>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
