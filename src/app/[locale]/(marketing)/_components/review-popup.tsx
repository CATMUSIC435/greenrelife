'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'sonner';
import { email } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ReviewPopupProps = {
  productId: number;
};

export default function ReviewPopup({ productId }: ReviewPopupProps) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Vui lòng nhập email!');
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error('Rating phải từ 1 đến 5!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
            `Basic ${
              btoa(
                'ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43',
              )}`,
        },
        body: JSON.stringify({
          product_id: productId,
          review,
          reviewer: user?.emailAddresses[0]?.emailAddress || 'Người dùng',
          reviewer_email: user?.emailAddresses[0]?.emailAddress,
          rating,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Cảm ơn bạn đã gửi đánh giá!');

        setOpen(false);
        setReview('');
      } else {
        toast.error(data?.message || 'Không thể gửi đánh giá!');
      }
    } catch (error) {
      toast.error('Lỗi kết nối! Vui lòng thử lại.');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-2 w-full bg-amber-400">Đánh giá sản phẩm</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="reviewer">Tên</Label>
            <Input
              className="mt-1"
              id="reviewer"
              disabled
              placeholder="Tên của bạn"
              value={user?.emailAddresses[0]?.emailAddress}
            />
          </div>

          <div>
            <Label htmlFor="rating">Đánh giá (1–5)</Label>
            <Input
              className="mt-1"
              id="rating"
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="review">Nội dung đánh giá</Label>
            <Textarea
              id="review"
              placeholder="Nhập cảm nhận của bạn"
              className="mt-1 h-28"
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
