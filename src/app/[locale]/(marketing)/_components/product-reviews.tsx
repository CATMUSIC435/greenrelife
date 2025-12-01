'use client';
import { useEffect, useState } from 'react';

type Review = {
  id: number;
  reviewer: string;
  review: string;
  rating: number;
};

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `https://greenrelife.dxmd.vn/wp-json/wc/v3/products/reviews?product=${productId}&per_page=10`,
        {
          headers: {
            Authorization:
              `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
          },
          cache: 'no-store',
        },
      );
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="rounded-md border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-bold">{r.reviewer}</p>
            <p className="text-yellow-500">{'★'.repeat(r.rating)}</p>
          </div>
          <div className="prose mt-2 max-w-none" dangerouslySetInnerHTML={{ __html: r.review || '' }} />
        </div>
      ))}
      {reviews.length === 0 && <p>Chưa có đánh giá nào.</p>}
    </div>
  );
}
