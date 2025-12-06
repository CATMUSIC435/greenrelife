'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type SellerChatListProps = {
  isUser?: boolean;
};
export default function SellerChatList({ isUser }: SellerChatListProps) {
  const { user } = useUser();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isUser) {
      fetch('/api/chat/user' + `?user=${user?.emailAddresses[0]?.emailAddress}`)
        .then(res => res.json())
        .then(setList);
    } else {
      fetch('/api/chat/seller' + `?user=${user?.emailAddresses[0]?.emailAddress}`)
        .then(res => res.json())
        .then(setList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return list.length === 0
    ? (
        <div className="px-4 py-4  text-black">Không có tin nhắn</div>
      )
    : (
        <div className="space-y-3">
          {list.map((c: any) => (
            <Link
              key={c.id}
              href={`/chat/seller/${c.id}`}
              className="block rounded-lg border p-4 shadow-sm hover:bg-gray-100"
            >
              <p className="font-semibold">
                Sản phẩm #
                {c.product_id}
              </p>
              <p className="text-sm text-black">{c.last_message}</p>
            </Link>
          ))}
        </div>
      );
}
