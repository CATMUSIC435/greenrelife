import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  const supabase = await createClient();
  const body = await req.json();
  const { seller_id, product_id } = body;

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: exists } = await supabase
    .from('conversations')
    .select('*')
    .eq('buyer_id', userId)
    .eq('seller_id', seller_id)
    .eq('product_id', product_id)
    .maybeSingle();

  if (exists) {
    return Response.json(exists);
  }

  const { data } = await supabase
    .from('conversations')
    .insert({
      buyer_id: userId,
      seller_id,
      product_id,
    })
    .select()
    .single();

  return Response.json(data);
}
