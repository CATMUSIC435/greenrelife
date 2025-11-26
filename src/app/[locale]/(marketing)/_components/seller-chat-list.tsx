'use client';
import { useEffect, useState } from 'react';

export default function SellerChatList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('/api/chat/seller')
      .then(res => res.json())
      .then(setList);
  }, []);

  return (
    <div className="space-y-3">
      {list.map((c: any) => (
        <a
          key={c.id}
          href={`/chat/${c.id}`}
          className="block rounded-lg border p-4 shadow-sm hover:bg-gray-100"
        >
          <p className="font-semibold">
            Sản phẩm #
            {c.product_id}
          </p>
          <p className="text-sm text-gray-600">{c.last_message}</p>
        </a>
      ))}
    </div>
  );
}
