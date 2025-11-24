'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCourses } from '@/api/course';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CoursePopup from '../_components/course-popup';

export default function CoursesCarrousel() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses(1, 10);
      setCourses(data.courses);
    };
    fetchCourses();
  }, []);

  return (
    <div className="h-60">
      <Carousel className="relative h-full w-full">
        <CarouselContent>
          {courses.map((course) => {
            const thumbnail
              = course?.yoast_head_json?.og_image?.[0]?.url || '/default-course.jpg';

            return (
              <CarouselItem key={course.id}>
                <div className="p-0">
                  <Card className="p-0">
                    <CardContent className="flex h-full items-center justify-center p-0">
                      <div
                        key={course.id}
                        className="group relative w-full flex-shrink-0 overflow-hidden rounded-md border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
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
                          <CoursePopup courseId={course.id} />
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
                              className="mb-1 text-sm font-semibold text-white transition group-hover:text-blue-600"
                              dangerouslySetInnerHTML={{ __html: course.title.rendered }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
