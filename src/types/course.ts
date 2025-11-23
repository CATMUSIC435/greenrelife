export type TutorCourse = {
  id: number;
  title: string;
  content: string;
  featured_img: string;
  video_type: string;
  video: string;
  price: string;
  duration: string;
  author: { id: number; name: string };
};
