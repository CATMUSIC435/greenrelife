import type { IPost } from '@/types/post';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function Index() {
  const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API ?? '';

  const res = await fetch(`${WORDPRESS_API}/posts?categories=18`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const data: Array<IPost> = await res.json();

  return (
    <div className="bg-white pt-4 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 pt-1 text-white lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((post, index) => (
            <article key={post.id} className={cn('flex max-w-xl flex-col items-start justify-between rounded-md bg-center px-4 py-4 md:rounded-2xl', !index ? 'col-span-2 pt-36' : 'pt-12')} style={{ backgroundImage: `url(${post.yoast_head_json.og_image[0]?.url})` }}>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-white">
                  {post.date}
                </time>
                {index
                  ? null
                  : (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-black hover:bg-gray-100"
                      >
                        {post.title.rendered}
                      </Link>
                    )}
              </div>
              <div className="group relative grow">
                <h3 className={cn('mt-2 font-semibold text-white group-hover:text-black', !index ? ' text-lg/6' : 'text-sm line-clamp-2')}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title.rendered}
                  </Link>
                </h3>
                {/* <p className="mt-4 hidden text-xs md:line-clamp-3 md:block">{post.description}</p> */}
              </div>
              {!index
                ? (
                    <div className="relative mt-2 flex items-center gap-x-4 justify-self-end">
                      <div className="text-sm/6">
                        <p className="font-semibold">
                          {post.yoast_head_json.author}
                        </p>
                      </div>
                    </div>
                  )
                : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
