import type { IPost } from '@/types/post';

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
      <h1 className="mb-4 text-center text-2xl font-bold">{post.title.rendered}</h1>
      {post.yoast_head_json.og_image[0]?.url && <img src={post.yoast_head_json.og_image[0]?.url} alt={post.title.rendered} className="mb-6" />}
      <p className="mb-6 text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: `${post.content.rendered}` }} />
    </div>
  );
}
