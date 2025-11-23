import type { TutorCourse } from '@/types/course';
import Image from 'next/image';

export default async function CoursesPage() {
  const res = await fetch(
    'https://greenrelife.dxmd.vn/wp-json/tutor/v1/courses',
    {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dyZWVucmVsaWZlLmR4bWQudm4iLCJpYXQiOjE3NjM5MTI1NjgsIm5iZiI6MTc2MzkxMjU2OCwiZXhwIjoxNzY0NTE3MzY4LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ._ykSZM0S8rKTrgaCTLnf4yZQwpyvAUG7rle7qhTVXBY',
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  const courses: TutorCourse[] = await res.json();
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Danh sách khóa học</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div
            key={course.id}
            className="rounded-lg border p-4 shadow transition hover:shadow-lg"
          >
            <Image
              height={1080}
              width={1920}
              src={course.featured_img}
              alt={course.title}
              className="h-40 w-full rounded object-cover"
            />
            <h2 className="mt-2 text-xl font-semibold">{course.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{course.duration}</p>
            <p
              className="mt-2 line-clamp-3 text-gray-800"
              // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
              dangerouslySetInnerHTML={{ __html: `${course.content}` }}
            />
            {course.video && (
              <div className="mt-2">
                {course.video_type === 'youtube' && (
                  <iframe
                    sandbox=""
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${extractYouTubeID(course.video)}`}
                    title={course.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
                {course.video_type === 'vimeo' && (
                  // eslint-disable-next-line react-dom/no-missing-iframe-sandbox, jsx-a11y/iframe-has-title
                  <iframe
                    src={`https://player.vimeo.com/video/${extractVimeoID(course.video)}`}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
                {/* self-hosted video */}
                {course.video_type === 'self' && (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    controls
                    src={course.video}
                    className="mt-2 w-full rounded"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

// Hàm lấy ID YouTube từ link
function extractYouTubeID(url: string) {
  const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(reg);
  return match ? match[1] : '';
}

// Hàm lấy ID Vimeo
function extractVimeoID(url: string) {
  const reg = /vimeo\.com\/(\d+)/;
  const match = url.match(reg);
  return match ? match[1] : '';
}
