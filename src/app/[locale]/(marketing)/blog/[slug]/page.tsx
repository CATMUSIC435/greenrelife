type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  featured_image?: string;
  date: string;
};

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`https://greenrelife.dxmd.vn/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) {
    return null;
  }

  const post: Post = await res.json();
  if (!post) {
    return null;
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
