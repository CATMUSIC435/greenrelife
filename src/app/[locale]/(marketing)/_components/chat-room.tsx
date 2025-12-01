'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import { RealtimeChat } from '@/components/realtime-chat';

type OriginalMessage = {
  content: string;
  conversation_id: string;
  created_at: string;
  id: string;
  sender_id: string;
};

type ClientMessage = {
  content: string;
  createdAt: string;
  id: string;
  user: { name: string };
};

export default function ChatRoom({ id }: { id: string }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<any>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const conversationId = id;

  useEffect(() => {
    // Load messages:
    fetch(`/api/chat/message/${conversationId}`)
      .then(res => res.json())
      .then((messages: Array<OriginalMessage>) => {
        const clientMessages: ClientMessage[] = messages.map(m => ({
          content: m.content,
          createdAt: new Date(m.created_at).toISOString(), // chuẩn ISO
          id: m.id,
          user: { name: m.sender_id },
        }));

        setMessages(clientMessages);
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="mx-auto flex max-w-xl flex-col border" style={{ height: '90vh' }}>
      {/* Messages */}
      <RealtimeChat roomName={id} username={user?.emailAddresses[0]?.emailAddress ?? ''} messages={messages} />
    </div>
  );
}
