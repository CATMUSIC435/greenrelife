import { createClient } from '@/lib/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { seller_id, product_id, user_id } = body;

  const { data: exists } = await supabase
    .from('conversations')
    .select('*')
    .eq('buyer_id', user_id)
    .eq('seller_id', seller_id)
    .eq('product_id', product_id)
    .maybeSingle();

  if (exists) {
    return Response.json(exists);
  }

  const { data } = await supabase
    .from('conversations')
    .insert({
      buyer_id: user_id,
      seller_id,
      product_id,
    })
    .select()
    .single();

  return Response.json(data);
}
