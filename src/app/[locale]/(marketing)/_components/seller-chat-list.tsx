'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SellerChatList() {
  const { user } = useUser();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('/api/chat/seller' + `?user=${user?.emailAddresses[0]?.emailAddress}`)
      .then(res => res.json())
      .then(setList);
  }, [user]);

  return (
    <div className="space-y-3">
      {list.map((c: any) => (
        <Link
          key={c.id}
          href={`/chat/${c.id}`}
          className="block rounded-lg border p-4 shadow-sm hover:bg-gray-100"
        >
          <p className="font-semibold">
            Sản phẩm #
            {c.product_id}
          </p>
          <p className="text-sm text-gray-600">{c.last_message}</p>
        </Link>
      ))}
    </div>
  );
}
