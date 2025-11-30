'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export function FavoriteButton({ productId }: { productId: number }) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);

  const toggleFavorite = async () => {
    if (liked) {
      await fetch('/api/favorites/remove', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, user_id: user?.id }),
      });
      setLiked(false);
    } else {
      await fetch('/api/favorites/add', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, user_id: user?.id }),
      });
      setLiked(true);
    }
  };

  return (
    <button type="button" onClick={toggleFavorite}>
      {liked ? '💖' : '🤍'}
    </button>
  );
}
