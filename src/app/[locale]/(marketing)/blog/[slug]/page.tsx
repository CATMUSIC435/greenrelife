import { notFound } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  featured_image?: string;
  date: string;
};

async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`https://greenrelife.dxmd.vn/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (!data || data.length === 0) {
    return null;
  }

  const post = data[0];
  const featured_image = post.featured_media
    ? await getFeaturedImage(post.featured_media)
    : undefined;

  return {
    id: post.id,
    title: post.title.rendered,
    content: post.content.rendered,
    slug: post.slug,
    featured_image,
    date: post.date,
  };
}

async function getFeaturedImage(mediaId: number) {
  const res = await fetch(`https://greenrelife.dxmd.vn/wp-json/wp/v2/media/${mediaId}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.source_url;
}

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  // Next.js 15: params vẫn unwrap được trong server component
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      {post.featured_image && <img src={post.featured_image} alt={post.title} className="mb-6" />}
      <p className="mb-6 text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
