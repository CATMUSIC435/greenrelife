'use client';
import { useEffect, useState } from 'react';

export function FavoriteButton({ productId }: { productId: number }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then((data) => {
        if (data.some((f: any) => f.product_id === productId)) {
          setLiked(true);
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
