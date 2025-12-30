import type { IPost } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CoursesCarrousel from '../_components/course-carousel';
import { formatDateDMY } from '@/utils/times';

export default async function Index() {
  const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API ?? '';

  const res = await fetch(`${WORDPRESS_API}/posts?categories=18`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resexp = await fetch(`${WORDPRESS_API}/posts?categories=29`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const data: Array<IPost> = await res.json();
  const dataexp: Array<IPost> = await resexp.json();

  return (
    <div className="pt-4 pb-24">
      <div className="px-4 pb-4">
        <CoursesCarrousel />
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-4 gap-y-4 pt-1 text-white lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((post, index) => (
            <article key={post.id} className={cn('flex max-w-xl flex-col items-start justify-between rounded-md bg-center px-4 py-4 md:rounded-2xl shadow-2xl', !index ? 'col-span-2 pt-30' : 'pt-12')} style={{ backgroundImage: `url(${post.yoast_head_json.og_image[0]?.url})` }}>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-white">
                  {formatDateDMY(post.date)}
                </time>
              </div>
              <div className="group relative grow">
                <h3 className={cn('mt-1 font-semibold text-white group-hover:text-black', !index ? ' text-lg/6 line-clamp-3' : 'text-sm line-clamp-2')}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title.rendered}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mx-auto grid max-w-2xl gap-x-4 gap-y-2 ">
          {dataexp.map((post, index) => (
            <article key={post.id} className={cn('grid grid-cols-4 max-w-xl gap-2 rounded-md bg-center md:rounded-2xl shadow-2xl py-3 px-2')}>
              <div className="w-full">
                <Image
                  height={1080}
                  width={1920}
                  src={`${post.yoast_head_json.og_image[0]?.url}`}
                  alt=""
                  className="h-full w-full rounded-md object-cover shadow"
                />
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-black">
                    {formatDateDMY(post.date)}
                  </time>
                </div>
                <div className="group relative grow">
                  <h3 className={cn('mt-1 font-semibold text-black ', !index ? ' text-sm line-clamp-3' : 'text-sm line-clamp-2')}>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title.rendered}
                    </Link>
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
