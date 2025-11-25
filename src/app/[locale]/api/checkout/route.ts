import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const wooUrl = 'https://greenrelife.dxmd.vn/wp-json/wc/v3/orders';

    const response = await fetch(wooUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: data },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e.message },
      { status: 500 },
    );
  }
}
