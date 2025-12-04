import ChatRoom from '../../../_components/chat-room';

export default async function ChatSellerPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <ChatRoom id={id} />;
}
