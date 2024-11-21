import { ICourse } from "@/database/course.model";

type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};
// User
type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  avatar?: string;
  name?: string;
};
// course
type TCreateCourseParams = {
  slug: string;
  title: string;
  author: string;
};
type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
};
// Lecture
type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};
type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
// Lesson
export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
};
interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}
// Lesson
type TCreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
};
export type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
};
// History
type TCreateHistoryParams = {
  path: string;
  course: string;
  lesson: string;
  checked: boolean | string;
};
// Type search params
export type TGetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
// Order
type TCreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};
// Coupon
export type TCouponParams = Omit<ICoupon, "courses"> & {
  courses: {
    _id: string;
    title: string;
  }[];
};
export interface StudyCoursesProps extends Omit<ICourse, "lectures"> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}
export type TRatingIcon = "awesome" | "good" | "meh" | "bad" | "terrible";
export type TCreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};
export type TRatingItem = {
  _id: string;
  content: string;
  rate: number;
  created_at: string;
  course: {
    title: string;
    slug: string;
  };
  user: {
    name: string;
  };
  status: ERatingStatus;
};
export {
  TRatingItem,
  TCreateRatingParams,
  TCreateUserParams,
  TCouponParams,
  TCreateOrderParams,
  TGetAllCourseParams,
  TMenuItem,
  TActiveLinkProps,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCreateLectureParams,
  TUpdateLectureParams,
  TCourseUpdateParams,
  TCreateLessonParams,
  TUpdateLessonParams,
  TCreateHistoryParams,
};
