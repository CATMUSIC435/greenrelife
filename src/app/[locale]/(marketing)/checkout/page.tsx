'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cart, _] = useState([
    { product_id: 123, quantity: 2 },
    { product_id: 555, quantity: 1 },
  ]);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);

    const orderBody = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: form,
      line_items: cart,
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

    window.location.href = `/`;
  };

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-5 text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="first_name"
          placeholder="First Name"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          className="rounded border p-2"
          onChange={handleChange}
        />

        <input
          name="address_1"
          placeholder="Địa chỉ"
          className="col-span-2 rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="Thành phố"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="Tỉnh/TP"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          name="postcode"
          placeholder="Zipcode"
          className="rounded border p-2"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={placeOrder}
        disabled={loading}
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white"
      >
        {loading ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </div>
  );
}
