export async function getCourses(page: number = 1, perPage: number = 10) {
  const url = `https://greenrelife.dxmd.vn/wp-json/wp/v2/courses?page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  const total = res.headers.get('X-WP-Total');
  const totalPages = res.headers.get('X-WP-TotalPages');

  const data = await res.json();

  return {
    courses: data,
    total: Number(total),
    totalPages: Number(totalPages),
  };
}
