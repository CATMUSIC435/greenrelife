'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'sonner';
import ServiceCardHor from '@/components/organisms/service-card-hor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { convertForWoo } from '@/utils/convert';
import { formatDatePretty } from '@/utils/format-date-pretty';
import { CalendarCheckout } from './calendar-checkout';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Loader2, ShieldCheck, CreditCard } from 'lucide-react';

type CheckoutServiceProps = {
  items: any;
};

export function CheckoutService({ items }: CheckoutServiceProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('Trong 0 ngày');

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'VN',
    email: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value, email: `${user?.emailAddresses[0]?.emailAddress}` });
  };

  const placeOrder = async () => {
    // Validation basic
    if (!form.first_name || !form.phone || !form.address_1) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Số điện thoại, Địa chỉ).');
      return;
    }

    setLoading(true);
    const products = convertForWoo(items);

    const orderBody = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: form,
      line_items: products,
      customer_note: value ?? '',
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(orderBody),
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Đặt hẹn thành công', {
        description: `Ngày tạo: ${formatDatePretty(new Date())}`,
      });
      window.location.href = `/order`; // Chuyển về trang lịch sử đơn hàng
    } catch (err: any) {
      console.error(err);
      toast.error('Có lỗi xảy ra', {
        description: err.message || 'Vui lòng thử lại sau',
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = items.reduce((acc: number, item: any) => {
    return acc + (Number(item.price) || 0);
  }, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 pt-8 pb-32">
      <FadeIn>
        <SectionTitle title="Xác nhận & Đặt hẹn" />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Form: Billing Info */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-[32px] border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldCheck className="text-primary h-6 w-6" />
              Thông tin liên hệ
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-muted-foreground">Họ</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Nguyễn Văn"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-muted-foreground">Tên <span className="text-red-500">*</span></Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="A"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="phone" className="text-muted-foreground">Số điện thoại <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="09xx xxx xxx"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address_1" className="text-muted-foreground">Địa chỉ chi tiết <span className="text-red-500">*</span></Label>
                <Input
                  id="address_1"
                  name="address_1"
                  placeholder="Số nhà, Tên đường, Phường/Xã"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-muted-foreground">Thành phố</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Hồ Chí Minh"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-muted-foreground">Quận/Huyện</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Quận 1"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="postcode" className="text-muted-foreground">Mã bưu điện (Zipcode)</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  placeholder="700000"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border/40">
              <h3 className="text-lg font-semibold mb-4">Thời gian đặt hẹn</h3>
              <CalendarCheckout value={value} setValue={setValue} />
            </div>
          </div>
        </div>

        {/* Right Summary: Order Details */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-[32px] border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-lg shadow-black/5 dark:shadow-white/5 space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight border-b border-border/50 pb-4">Tóm tắt dịch vụ</h3>
              
              <div className="space-y-4 pt-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {items.map((item: any) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-background/50 p-2">
                    <ServiceCardHor 
                      id={item.id} 
                      title={item.name} 
                      img={item.images?.[0]?.src || '/placeholder.png'} 
                      description={item.price ? `${Number(item.price).toLocaleString()} ₫` : 'Liên hệ'} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-medium">{totalPrice > 0 ? `${totalPrice.toLocaleString()} ₫` : 'Theo thực tế'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Phí đi lại (Ước tính)</span>
                <span className="font-medium text-emerald-600">Thỏa thuận</span>
              </div>
              
              <div className="flex items-center justify-between text-lg font-bold pt-4 border-t border-border/50">
                <span>Tổng cộng</span>
                <span className="text-primary text-2xl">{totalPrice > 0 ? `${totalPrice.toLocaleString()} ₫` : 'Liên hệ'}</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 p-3 rounded-xl border border-border/40">
                <CreditCard className="h-5 w-5 shrink-0" />
                <span>Thanh toán trực tiếp cho kỹ thuật viên sau khi hoàn tất dịch vụ.</span>
              </div>

              <Button
                onClick={placeOrder}
                disabled={loading}
                className="w-full h-14 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang xử lý đặt hẹn...
                  </>
                ) : (
                  'Xác nhận đặt hẹn'
                )}
              </Button>
            </div>

          </div>
        </div>
      </FadeIn>
    </div>
  );
}
