import type { IPost } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateDMY } from '@/utils/times';
import CoursesCarrousel from '../_components/course-carousel';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';

export default async function Index() {
  const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API ?? '';

  const res = await fetch(`${WORDPRESS_API}/posts?categories=18`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  });

  const resexp = await fetch(`${WORDPRESS_API}/posts?categories=29`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  const data: Array<IPost> = await res.json();
  const dataexp: Array<IPost> = await resexp.json();

  return (
    <div className="pt-4 pb-24">
      <div className="px-4 pb-12">
        <CoursesCarrousel />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="Bài viết nổi bật" />
        <div className="mx-auto grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {data.map((post, index) => (
            <FadeIn 
              key={post.id} 
              delay={index * 0.1}
            >
              <article className="group flex flex-row sm:flex-col gap-3 sm:gap-0 overflow-hidden rounded-2xl bg-card p-2 sm:p-0 shadow-sm border border-border transition-all hover:shadow-md h-full">
                <div className="relative h-28 w-28 sm:h-48 sm:w-full shrink-0 overflow-hidden rounded-xl sm:rounded-none sm:rounded-t-2xl bg-muted">
                  {post.yoast_head_json?.og_image?.[0]?.url ? (
                    <Image
                      src={post.yoast_head_json.og_image[0].url}
                      alt={post.title?.rendered || 'Blog thumbnail'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
                <div className="flex flex-col justify-center px-2 py-1 sm:p-5">
                  <div className="flex items-center gap-x-4 text-[10px] sm:text-xs">
                    <time dateTime={post.date} className="text-muted-foreground font-medium">
                      {formatDateDMY(post.date)}
                    </time>
                  </div>
                  <div className="mt-1 sm:mt-3 group relative">
                    <h3 className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title.rendered}
                      </Link>
                    </h3>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:pt-16">
        <SectionTitle title="Kinh nghiệm & Chia sẻ" />
        <div className="mx-auto grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {dataexp.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1}>
              <article className="group flex flex-row sm:flex-col gap-3 sm:gap-0 overflow-hidden rounded-2xl bg-card p-2 sm:p-0 shadow-sm border border-border transition-all hover:shadow-md h-full">
                <div className="relative h-24 w-24 sm:h-48 sm:w-full shrink-0 overflow-hidden rounded-xl sm:rounded-none sm:rounded-t-2xl bg-muted">
                  {post.yoast_head_json?.og_image?.[0]?.url && (
                    <Image
                      src={post.yoast_head_json.og_image[0].url}
                      alt={post.title?.rendered || 'Thumbnail'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center px-2 py-1 sm:p-5">
                  <div className="flex items-center gap-x-4 text-[10px] sm:text-xs">
                    <time dateTime={post.date} className="text-muted-foreground font-medium">
                      {formatDateDMY(post.date)}
                    </time>
                  </div>
                  <div className="mt-1 sm:mt-2 group relative">
                    <h3 className="text-xs sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 sm:line-clamp-3">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title.rendered}
                      </Link>
                    </h3>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
