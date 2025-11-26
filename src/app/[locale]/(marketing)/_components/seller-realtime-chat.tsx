'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Props = {
  roomName: string;
  username: string;
};

export default function SellerRealtimeChat({ roomName, username }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  // Load tin nhắn cũ
  const loadMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('room_name', roomName)
      .order('created_at', { ascending: true });

    setMessages(data || []);
  };

  // Lắng nghe realtime
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMessages();

    const channel = supabase
      .channel(`chat-${roomName}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_name=eq.${roomName}` },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomName]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    await supabase.from('messages').insert([
      {
        room_name: roomName,
        sender: username,
        message: input.trim(),
      },
    ]);

    setInput('');
  };

  return (
    <div className="w-full max-w-lg rounded-lg border bg-white p-4 shadow">
      <h3 className="mb-3 text-lg font-bold">Chat with seller</h3>

      <div className="mb-3 h-72 overflow-y-auto rounded border bg-gray-50 p-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 rounded p-2 ${
              msg.sender === username
                ? 'bg-blue-200 text-right'
                : 'bg-gray-200 text-left'
            }`}
          >
            <div className="text-xs font-semibold">{msg.sender}</div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-600 px-4 text-white"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
