'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import CancelOrderPopup from '../_components/cancel-order-popup';

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
  const [open, setOpen] = useState(false);
  const [genUID, setGenUID] = useState('');

  useEffect(() => {
    if (user) {
      fetch('/api/orders' + `?user_email=${user?.emailAddresses[0]?.emailAddress}`)
        .then(res => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, genUID]);

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
              {Number(order.total).toLocaleString()}
              ₫
            </p>
            {order?.status?.toLowerCase() === 'pending'
              ? (
                  <div className="p-10">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="w-full rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                      Hủy đơn hàng
                    </button>

                    {open && (
                      <CancelOrderPopup
                        onChange={() => setGenUID(uuid())}
                        id={order.id}
                        onClose={() => setOpen(false)}
                      />
                    )}
                  </div>
                )
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
