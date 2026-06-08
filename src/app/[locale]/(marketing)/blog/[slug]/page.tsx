import type { IPost } from '@/types/post';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/ui/fade-in';
import { Calendar } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`https://greenrelife.dxmd.vn/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  
  if (!res.ok) {
    return notFound();
  }

  const posts: Array<IPost> = await res.json();
  const post = posts[0];

  if (!post) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8 pt-12 pb-32">
      <FadeIn className="space-y-8 lg:space-y-12">
        
        {/* Header section */}
        <header className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground border border-border/50 backdrop-blur-md">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </header>

        {/* Hero Image */}
        {post.yoast_head_json?.og_image?.[0]?.url && (
          <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full overflow-hidden rounded-[32px] border border-border/50 bg-card/50 p-2 shadow-sm backdrop-blur-xl">
            <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-muted/20">
              <Image 
                fill 
                src={post.yoast_head_json.og_image[0].url} 
                alt={post.title.rendered.replace(/<[^>]+>/g, '')} 
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <article className="rounded-[32px] border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-10 md:p-14 shadow-sm mt-8">
          <div 
            className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-[24px] prose-img:shadow-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
          />
        </article>

      </FadeIn>
    </div>
  );
}
