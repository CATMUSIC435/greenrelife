import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('user');

  const supabase = await createClient();

  const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('buyer_id', userId)
    .order('updated_at', { ascending: false });

  return Response.json(data);
}
