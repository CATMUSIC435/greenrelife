import type { IPost } from '@/types/post';
import Image from 'next/image';

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`https://greenrelife.dxmd.vn/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) {
    return null;
  }

  const posts: Array<IPost> = await res.json();
  const post = posts[0];

  if (!post) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-2 pb-20">
      <h1 className="mb-2 text-center text-2xl font-bold text-white text-shadow-2xs">{post.title.rendered}</h1>
      {post.yoast_head_json.og_image[0]?.url && <Image height={600} width={900} src={post.yoast_head_json.og_image[0]?.url} alt={post.title.rendered} className="mb-4 rounded-md" />}
      <p className="mb-2 text-xs">{new Date(post.date).toLocaleDateString()}</p>
      <div className="rounded-md border-[1px] border-white px-2 py-4 shadow-2xs">
        <div dangerouslySetInnerHTML={{ __html: `${post.content.rendered}` }} />
      </div>
    </div>
  );
}
