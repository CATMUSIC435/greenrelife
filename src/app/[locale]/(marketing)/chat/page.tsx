'use client';

import { RealtimeChat } from '@/components/realtime-chat';

export default function Index() {
  return <RealtimeChat roomName="my-chat-room" username="john_doe" />;
}
