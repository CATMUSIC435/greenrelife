'use client';
import React from 'react';

import { useOrders } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/skeleton';

type OrderHistoryProps = { userId: number };

export const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const { orders, loading } = useOrders(userId);

  if (loading) {
    return (
      <div className="mx-auto mt-6 max-w-3xl rounded-lg border p-4 shadow-md space-y-4">
        <Skeleton className="h-8 w-48 mb-4" />
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-md border p-4 space-y-3">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
            <div className="ml-4 space-y-2 mt-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
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
