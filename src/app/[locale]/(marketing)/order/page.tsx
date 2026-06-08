'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import CancelOrderPopup from '../_components/cancel-order-popup';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Package, Calendar, DollarSign, XCircle } from 'lucide-react';

type Order = {
  id: number;
  status: string;
  date_created: string;
  total: string;
  line_items: { name: string; quantity: number }[];
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);
  const [genUID, setGenUID] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    fetch('/api/orders' + `?user_email=${user.emailAddresses[0]?.emailAddress}`)
      .then(res => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, isLoaded, genUID]);

  if (!isLoaded || loading) {
    return (
      <div className="mx-auto max-w-4xl p-6 py-12">
        <SectionTitle title="Lịch sử đơn hàng" />
        <div className="mt-8 space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-0 shadow-sm">
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-border bg-muted/10">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full shrink-0" />
              </div>
              <div className="p-4 sm:px-6 space-y-4">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-3">
                  <div className="flex justify-between gap-4"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-8 shrink-0" /></div>
                  <div className="flex justify-between gap-4"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-8 shrink-0" /></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-border pt-4 mt-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-full sm:w-32 rounded-full shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'completed': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 py-12">
      <FadeIn>
        <SectionTitle title="Lịch sử đơn hàng" />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground shadow-sm">
            Bạn chưa có đơn hàng nào.
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="relative overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition-all hover:shadow-md">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border bg-muted/30 p-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Package className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">
                      Đơn hàng #{order.id}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                      <Calendar className="size-3.5" />
                      {new Date(order.date_created).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <span className={cn(
                  'rounded-full border px-3 py-1 text-xs font-semibold capitalize whitespace-nowrap',
                  getStatusColor(order.status)
                )}>
                  {order.status}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 sm:px-6">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Chi tiết sản phẩm</h3>
                <ul className="space-y-2">
                  {order.line_items.map((item, i) => (
                    <li key={i} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-muted-foreground line-clamp-2 flex-1">{item.name}</span>
                      <span className="font-medium text-foreground whitespace-nowrap">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-4">
                  <div className="flex items-center gap-1 text-lg font-bold text-primary">
                    <DollarSign className="size-5" />
                    {Number(order.total).toLocaleString()} ₫
                  </div>

                  {order?.status?.toLowerCase() === 'pending' && (
                    <div className="w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setOpen(order.id)}
                        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-destructive text-destructive px-6 py-2 text-sm font-medium transition-colors hover:bg-destructive hover:text-destructive-foreground active:scale-95"
                      >
                        <XCircle className="size-4" />
                        Hủy đơn hàng
                      </button>

                      {open === order.id && (
                        <CancelOrderPopup
                          onChange={() => {
                            setGenUID(uuid());
                            setOpen(null);
                          }}
                          id={order.id}
                          onClose={() => setOpen(null)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </FadeIn>
    </div>
  );
}
