import { NextResponse } from 'next/server';
import { woo } from '@/lib/woo';

export async function POST(req: Request) {
  const data = await req.json();

  const order = await woo.post('orders', {
    payment_method: 'cod',
    payment_method_title: 'Cash on Delivery',
    set_paid: false,
    billing: data.billing,
    shipping: data.shipping,
    line_items: data.items.map((i: any) => ({
      product_id: i.product_id,
      quantity: i.quantity,
    })),
  });

  return NextResponse.json(order.data);
}
