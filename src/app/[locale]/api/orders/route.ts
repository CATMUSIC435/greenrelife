import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const wooUrl = 'https://greenrelife.dxmd.vn/wp-json/wc/v3/orders?meta_key=_billing_email&meta_value=phuongdongiot@gmail.com';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) {
      return new Response('Missing email', { status: 400 });
    }

    const response = await fetch(wooUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: data },
        { status: 400 },
      );
    }

    const filtered = data.filter((order: any) => {
      return order.billing?.email?.toLowerCase() === email.toLowerCase();
    });

    return Response.json(filtered);
  } catch (err: unknown) {
    return new Response(`${err}`, { status: 500 });
  }
}
