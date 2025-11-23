import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch('https://greenrelife.io.vn/wp-json/custom/v1/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*',
        'Origin': 'https://greenrelife.io.vn',
        'Referer': 'https://greenrelife.io.vn/',
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    // DEBUG — in ra response thật sự
    // console.log('RAW RESPONSE:', text);

    // Nếu response là HTML → trả lỗi
    if (text.startsWith('<')) {
      return NextResponse.json(
        { error: 'WordPress trả về HTML (bị chặn bởi Cloudflare hoặc Hosting)', raw: text },
        { status: 500 },
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
