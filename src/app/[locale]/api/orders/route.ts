import { NextResponse } from 'next/server';
import { woo } from '@/lib/woo';

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id')!;

  const res = await woo.get('orders', {
    customer: userId,
  });

  return NextResponse.json(res.data);
}
