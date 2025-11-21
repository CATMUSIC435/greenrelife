import type { IPost } from '@/types/post';
import Link from 'next/link';
import { NextResponse } from 'next/server';

export default async function Index() {
  const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API ?? '';

  const res = await fetch(`${WORDPRESS_API}/posts?categories=18`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: `WordPress API returned ${res.status}` }, { status: res.status });
  }

  const data: Array<IPost> = await res.json();

  return (
    <div className="bg-white pt-4 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 text-white sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map(post => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between rounded-md bg-center px-4 py-4 pt-36 md:rounded-2xl" style={{ backgroundImage: `url(${post.yoast_head_json.og_image[0]?.url})` }}>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-white">
                  {post.date}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-black hover:bg-gray-100"
                >
                  {post.title.rendered}
                </Link>
              </div>
              <div className="group relative grow">
                <h3 className="text-wwite group-hover:text-wwite mt-2 text-lg/6 font-semibold">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title.rendered}
                  </Link>
                </h3>
                {/* <p className="mt-4 hidden text-xs md:line-clamp-3 md:block">{post.description}</p> */}
              </div>
              <div className="relative mt-2 flex items-center gap-x-4 justify-self-end">
                <div className="text-sm/6">
                  <p className="font-semibold">
                    {post.yoast_head_json.author}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
