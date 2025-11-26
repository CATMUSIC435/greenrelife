import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/server';

export async function GET() {
  const { userId } = await auth();
  const supabase = await createClient();

  const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('seller_id', userId)
    .order('updated_at', { ascending: false });

  return Response.json(data);
}
