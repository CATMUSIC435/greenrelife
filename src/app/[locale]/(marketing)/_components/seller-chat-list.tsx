'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { Skeleton } from '@/components/ui/skeleton';

type SellerChatListProps = {
  isUser?: boolean;
};

export default function SellerChatList({ isUser }: SellerChatListProps) {
  const { user, isLoaded } = useUser();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const endpoint = isUser ? '/api/chat/user' : '/api/chat/seller';
    
    fetch(`${endpoint}?user=${email}`)
      .then(res => res.json())
      .then(data => {
        setList(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoaded, isUser]);

  if (!isLoaded || loading) {
    return (
      <div className="space-y-3 mt-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="block rounded-xl border border-border bg-card p-4 shadow-sm">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return !list || list.length === 0
    ? (
        <FadeIn className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground shadow-sm mt-4">
          Không có tin nhắn nào.
        </FadeIn>
      )
    : (
        <FadeIn className="space-y-3 mt-4">
          {list.map((c: any) => (
            <Link
              key={c.id}
              href={`/chat/seller/${c.id}`}
              className="block rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted"
            >
              <p className="font-semibold text-foreground">
                Sản phẩm #{c.product_id}
              </p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{c.last_message}</p>
            </Link>
          ))}
        </FadeIn>
      );
}
