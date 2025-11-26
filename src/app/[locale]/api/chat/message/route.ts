import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  const supabase = await createClient();
  const { conversation_id, content } = await req.json();

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: msg } = await supabase
    .from('messages')
    .insert({
      conversation_id,
      sender_id: userId,
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
