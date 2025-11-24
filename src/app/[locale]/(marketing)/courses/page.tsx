import Image from 'next/image';
import { getCourses } from '@/api/course';
import { Badge } from '@/components/ui/badge';
import CoursePopup from '../_components/course-popup';

export default async function CoursesPage() {
  const { courses, total, totalPages } = await getCourses(1, 10);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: any) => {
          const thumbnail
            = course?.yoast_head_json?.og_image?.[0]?.url
              || '/default-course.jpg';

          return (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  height={1920}
                  width={1080}
                  src={thumbnail}
                  alt={course.title.rendered}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 w-full">

                <CoursePopup />
                <div className="w-full bg-white/20 p-2 backdrop-blur-md">
                  {course.course_categories && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {course.course_categories.map((cat: any) => (
                        <Badge key={cat} variant="secondary">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <h2
                    className="text-md mb-1 font-semibold text-white transition group-hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: course.title.rendered }}
                  />
                  <p
                    className="mb-2 line-clamp-3 text-sm text-white"
                    dangerouslySetInnerHTML={{ __html: course.excerpt.rendered }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-gray-500">
        Tổng số khóa học:
        {' '}
        <b>{total}</b>
        {' '}
        — Tổng số trang:
        {' '}
        <b>{totalPages}</b>
      </p>
    </div>
  );
}
