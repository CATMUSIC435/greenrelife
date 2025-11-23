'use client';

import { useEffect, useState } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders', {
      headers: { 'x-user-id': '1' },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Lịch sử mua hàng</h2>

      {orders.map((o: any) => (
        <div key={o.id} className="rounded-lg border p-4">
          <p className="font-semibold">
            Order #
            {o.id}
          </p>
          <p>
            Ngày:
            {o.date_created}
          </p>
          <p>
            Tổng:
            {o.total}
            ₫
          </p>
        </div>
      ))}
    </div>
  );
}
