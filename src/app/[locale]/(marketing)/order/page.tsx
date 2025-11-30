'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

type Order = {
  id: number;
  status: string;
  date_created: string;
  total: string;
  line_items: { name: string; quantity: number }[];
};

export default function OrdersPage() {
  const { user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders' + `?user_email=${user?.emailAddresses}`)
      .then(res => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-5">Đang tải đơn hàng...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Lịch sử đơn hàng</h1>

      {orders.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="rounded-xl border p-4 shadow-sm">
            <div className="flex justify-between">
              <h2 className="font-semibold">
                Đơn hàng #
                {order.id}
              </h2>
              <span className="text-sm capitalize">
                Trạng thái:
                {' '}
                <b>{order.status}</b>
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Ngày đặt:
              {' '}
              {new Date(order.date_created).toLocaleString()}
            </p>

            <div className="mt-3">
              <h3 className="mb-1 font-medium">Sản phẩm:</h3>
              <ul className="ml-5 list-disc text-sm">
                {order.line_items.map((item, i) => (
                  <li key={i}>
                    {item.name}
                    {' '}
                    ×
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 font-semibold">
              Tổng tiền:
              {order.total}
              ₫
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
