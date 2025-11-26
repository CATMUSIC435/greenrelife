'use client';
import { useState } from 'react';

export function FavoriteButton({ productId }: { productId: number }) {
  const [liked, setLiked] = useState(false);

  const toggleFavorite = async () => {
    if (liked) {
      await fetch('/api/favorites/remove', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
      });
      setLiked(false);
    } else {
      await fetch('/api/favorites/add', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
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
