'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Contact Form 7 yêu cầu format field đúng name
    const body = {
      'your-name': formData.get('your-name'),
      'your-email': user?.emailAddresses[0]?.emailAddress,
      'your-subject': formData.get('your-subject'),
      'your-message': formData.get('your-message'),
    };

    try {
      await fetch(
        'https://greenrelife.dxmd.vn/wp-json/custom-api/v1/contact',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      toast.success('Gửi thành công!');
      router.push(`/user-profile`);
    } catch (error) {
      toast.error('Lỗi kết nối server!');
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="space-y-1">
        <Label className="font-medium text-white">Tên của bạn</Label>
        <Input
          name="your-name"
          required
          placeholder="Nhập tên..."
          className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-1">
        <Label className="font-medium text-white">Tiêu đề</Label>
        <Input
          name="your-subject"
          required
          placeholder="Tiêu đề"
          className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-1">
        <Label className="font-medium text-white">Tin nhắn</Label>
        <Textarea
          name="your-message"
          placeholder="Tin nhắn (không bắt buộc)"
          className="min-h-[120px] border-white/20 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full font-semibold"
      >
        {loading
          ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                Đang gửi...
              </span>
            )
          : (
              'Gửi'
            )}
      </Button>
    </form>

  );
}
