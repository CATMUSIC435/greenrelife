'use client';

import { CirclePlay } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Course = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  intro_video?: {
    source_html5: string;
  };
};

type CoursePopupProps = {
  courseId?: number;
};

export default function CoursePopup({ courseId = 119 }: CoursePopupProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://greenrelife.dxmd.vn/wp-json/wp/v2/courses/${courseId}`,
      );
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={fetchCourse} className="h-12 w-12 bg-gray-200/20 p-2 backdrop-blur-md">
          <CirclePlay size={90} className="h-12 w-12 object-cover" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left">
            {loading ? 'Đang tải...' : course?.title.rendered}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          {course && (
            <>
              {course.intro_video
                ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      src={course.intro_video.source_html5}
                      controls
                      className="w-full shadow"
                    />
                  )
                : null}

              <div className="h-60 w-full overflow-x-scroll">
                <div
                  dangerouslySetInnerHTML={{ __html: course.content.rendered }}
                  className="prose max-w-full"
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
