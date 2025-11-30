import { createClient } from '@/lib/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { conversation_id, content, user_id } = await req.json();

  const { data: msg } = await supabase
    .from('messages')
    .insert({
      conversation_id,
      sender_id: user_id,
      content,
    })
    .select()
    .single();

  // Update last_message
  await supabase
    .from('conversations')
    .update({
      last_message: content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', conversation_id);

  return Response.json(msg);
}
