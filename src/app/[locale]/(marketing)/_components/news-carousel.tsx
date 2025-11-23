'use client';

import type { IPost } from '@/types/post';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

export default function NewsCarousel() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const fetchPosts = async () => {
      const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API ?? '';

      const res = await fetch(`${WORDPRESS_API}/posts?categories=18`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="shrink-0 basis-1/2 px-1" // hiển thị 2 tin tức mỗi slide
            >
              <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow">
                <img
                  src={post.yoast_head_json.og_image[0]?.url}
                  alt={post.title.rendered}
                  className="h-40 w-full rounded-lg object-cover"
                />
                <h3
                  className="mt-3 line-clamp-3 text-xs font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
