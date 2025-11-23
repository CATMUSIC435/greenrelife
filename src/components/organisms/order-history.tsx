'use client';
import React from 'react';

import { useOrders } from '@/hooks/use-orders';

type OrderHistoryProps = { userId: number };

export const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const { orders, loading } = useOrders(userId);

  if (loading) {
    return <p>Đang tải đơn hàng...</p>;
  }
  if (!orders.length) {
    return <p>Chưa có đơn hàng nào.</p>;
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Lịch sử mua hàng</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="rounded-md border p-4">
            <p className="font-semibold">
              Đơn #
              {order.id}
              {' '}
              - Trạng thái:
              {order.status}
            </p>
            <p>
              Tổng:
              {order.total}
              {' '}
              {order.currency}
            </p>
            <p>
              Ngày:
              {new Date(order.date_created).toLocaleDateString()}
            </p>
            <ul className="mt-2 ml-4 list-disc">
              {order.line_items.map((item: any) => (
                <li key={item.id}>
                  {item.name}
                  {' '}
                  x
                  {' '}
                  {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
