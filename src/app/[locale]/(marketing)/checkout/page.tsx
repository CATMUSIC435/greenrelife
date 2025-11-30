'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/stores/cart';
import { convertForWoo } from '@/utils/convert';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const products = convertForWoo(items);

    const orderBody = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: form,
      line_items: products,
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(orderBody),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      return;
    }

    clear();
    window.location.href = `/`;
  };

  return (
    <div className="mx-auto max-w-3xl pt-2 pb-20">
      <Card className="border-none bg-transparent shadow-lg">
        <CardHeader>
          <CardTitle className="w-full rounded-md px-2 py-2 text-2xl font-bold text-white shadow-2xl text-shadow-2xs">Checkout</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* FIRST NAME */}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>

            {/* LAST NAME */}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <div className="col-span-2 flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
              />
            </div>

            {/* ADDRESS */}
            <div className="col-span-2 flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="address_1">Địa chỉ</Label>
              <Input
                id="address_1"
                name="address_1"
                placeholder="Địa chỉ"
                onChange={handleChange}
              />
            </div>

            {/* CITY */}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="city">Thành phố</Label>
              <Input
                id="city"
                name="city"
                placeholder="Thành phố"
                onChange={handleChange}
              />
            </div>

            {/* STATE */}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="state">Tỉnh/TP</Label>
              <Input
                id="state"
                name="state"
                placeholder="Tỉnh/TP"
                onChange={handleChange}
              />
            </div>

            {/* POSTCODE */}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="postcode">Zipcode</Label>
              <Input
                id="postcode"
                name="postcode"
                placeholder="Zipcode"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <Button
            onClick={placeOrder}
            disabled={loading}
            className="mt-6 w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Đang xử lý...' : 'Đặt hàng'}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-4 px-4 pt-2">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <Image
              height={1080}
              width={1920}
              alt=""
              src={item.image}
              className="h-16 w-20 rounded object-cover"
            />

            <div className="flex-1">
              <p className="line-clamp-3 font-medium">{item.name}</p>
              <p className="text-sm">
                <span className="rounded-md border-[1px] border-white p-1 px-2 font-bold text-white">
                  {item.quantity}
                </span>
                {' '}
                {item.price}
                ₫
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
