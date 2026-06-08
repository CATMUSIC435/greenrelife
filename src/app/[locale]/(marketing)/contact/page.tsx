'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Loader2, Mail, MessageSquare, User } from 'lucide-react';

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
      const res = await fetch(
        'https://greenrelife.dxmd.vn/wp-json/custom-api/v1/contact',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) throw new Error('Lỗi gửi tin nhắn');

      toast.success('Gửi thành công!', {
        description: 'Chúng tôi sẽ phản hồi bạn sớm nhất có thể.',
      });
      router.push(`/user-profile`);
    } catch (error) {
      toast.error('Lỗi kết nối server!', {
        description: 'Không thể gửi tin nhắn lúc này.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 pt-12 pb-32">
      <FadeIn>
        <SectionTitle title="Liên hệ với chúng tôi" />
        <p className="text-center text-muted-foreground mt-4 mb-10 text-base sm:text-lg">
          Hãy để lại lời nhắn, GreenReLife luôn sẵn lòng lắng nghe và hỗ trợ bạn!
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl space-y-6 rounded-[32px] border border-border/50 bg-card/40 p-6 sm:p-10 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5"
        >
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <User className="h-4 w-4 text-emerald-500" /> Tên của bạn <span className="text-red-500">*</span>
            </Label>
            <Input
              name="your-name"
              required
              placeholder="Nhập họ và tên..."
              className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-emerald-500"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <Mail className="h-4 w-4 text-emerald-500" /> Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              name="your-subject"
              required
              placeholder="Nhập tiêu đề lời nhắn..."
              className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-emerald-500"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <MessageSquare className="h-4 w-4 text-emerald-500" /> Tin nhắn
            </Label>
            <Textarea
              name="your-message"
              placeholder="Nội dung lời nhắn (không bắt buộc)..."
              className="min-h-[150px] resize-none bg-background/50 border-border/50 rounded-xl p-4 focus-visible:ring-emerald-500"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                'Gửi tin nhắn'
              )}
            </Button>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}
