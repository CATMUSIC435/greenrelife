import { createClient } from '@/lib/server';

export async function GET(_: Request, context: any) {
  const params = await context.params;
  const conversationId = params.id; // string

  const supabase = await createClient();

  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  return Response.json(data);
}
