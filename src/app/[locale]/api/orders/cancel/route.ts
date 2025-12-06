import { NextResponse } from 'next/server';

const baseUrl = 'https://greenrelife.dxmd.vn/wp-json/wc/v3/orders';

export async function POST(req: Request) {
  const { orderId, cancelNote } = await req.json();

  try {
    const url = `${baseUrl}/${orderId}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
      },
      body: JSON.stringify({
        status: 'cancelled',
        customer_note: cancelNote ?? '',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: true, message: data }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    return NextResponse.json({ error: true, message: err }, { status: 500 });
  }
}
