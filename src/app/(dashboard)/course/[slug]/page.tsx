/* eslint-disable @typescript-eslint/no-explicit-any */
import PageNotFound from "@/app/not-found";
import { IconPlay } from "@/icons";
import IconCheck from "@/icons/IconCheck";
import {
  getCourseBySlug,
  getCourseLessonsInfo,
  updateCourseView,
} from "@/lib/actions/courses.action";
import { ECourseStatus } from "@/types/enum";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ILesson } from "@/database/lesson.model";
// import ButtonEnroll from "./ButtonEnroll";
import { auth } from "@clerk/nextjs/server";
import { getUsersInfo } from "@/lib/actions/users.actions";
import CourseWidget from "./CourseWidget";
import AlreadyStudy from "./AlreadyStudy";
import { formatMinutesToHour, formatNumberToK } from "@/utils";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  await updateCourseView({ slug: params.slug });
  const course = await getCourseBySlug({ slug: params.slug });
  if (!course) return null;
  const { userId } = auth();
  const findUser = await getUsersInfo(userId || "");
  const userCourses = findUser?.courses.map((c) => c.toString());
  if (course.status !== ECourseStatus.APPROVED) {
    return <PageNotFound></PageNotFound>;
  }
  const ratings = course.rating.map((r: any) => r);
  console.log("🚀 ~ ratings:", ratings);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { duration, lessons }: any = await getCourseLessonsInfo({
    slug: params.slug,
  });
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-8 p-5 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5 border border-gray-300 rounded-lg overflow-hidden">
          <Image
            src={course.image}
            alt="123"
            className="w-full h-full object-fill"
            fill
          ></Image>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className=" flex items-center gap-3 p-2 text-sm font-medium rounded-md border borderDarkMode bgDarkMode"
            >
              <Image
                src={rating.user.avatar}
                alt="image"
                width={30}
                height={30}
                className="object-cover rounded-full"
              ></Image>
              <span className="text-slate-500"> {rating.content}</span>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-8">{course.title}</h2>
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-5">Mô tả:</h3>
          <p className="text-gray-500">{course.desc}</p>
        </div>
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-5">Nội dung:</h3>
          {course.lectures.map((item) => {
            return (
              <Accordion type="single" collapsible key={item._id}>
                <AccordionItem value={item._id}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent className="mb-2">
                    {item.lessons.map((lesson: ILesson) => {
                      return (
                        <div className="flex flex-col gap-5" key={lesson._id}>
                          <div className="flex items-center gap-5 mb-5 pb-5 border-b-2 border-dotted border-b-gray-400 bgDarkMode borerDarkMode ">
                            <IconPlay className="flex-shrink-0 h-7 w-7 p-1  rounded-md bg-primary text-white"></IconPlay>
                            <div className="text-base font-medium dark:text-white/80">
                              {lesson.title}
                            </div>
                            <span className="ml-auto text-xs font-semibold">
                              {lesson.duration} phút
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-2">Thông tin:</h3>
          <div className="grid grid-cols-4 gap-8 ">
            <div className="bg-primary/85 text-white rounded-lg shadow p-3">
              <h4 className="text-lg font-bold">Bài học:</h4>
              <span className="text-sm  text-white font-medium">{lessons}</span>
            </div>
            <div className="bg-primary/85 text-white rounded-lg shadow p-3">
              <h4 className="text-lg font-bold">Lượt xem:</h4>
              <span className="text-sm  text-white font-medium">
                {formatNumberToK(course.views)}
              </span>
            </div>
            <div className="bg-primary/85 text-white rounded-lg shadow p-3">
              <h4 className="text-lg font-bold">Trình độ:</h4>
              <span className="text-sm  text-white font-medium">
                Trung bình
              </span>
            </div>
            <div className="bg-primary/85  text-white rounded-lg shadow p-3">
              <h4 className="text-lg font-bold">Thời lượng:</h4>
              <span className="text-sm  text-white font-medium">
                {formatMinutesToHour(duration)}
              </span>
            </div>
          </div>
        </div>
        {/* Yêu cầu */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-5">Yêu cầu:</h3>
          {course.info.requirements.map((item, index) => {
            return (
              <div className="flex items-center gap-3" key={index + 1}>
                <div className="bg-primary text-white rounded-md p-1">
                  <IconCheck className="size-4"></IconCheck>
                </div>
                <p className="dark:text-white">{item}</p>
              </div>
            );
          })}
        </div>
        {/* Lơi ích */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-5">Lợi ích:</h3>
          {course.info.benefits.map((item, index) => {
            return (
              <div className="flex items-center gap-3" key={index + 1}>
                <div className="bg-primary text-white rounded-md p-1">
                  <IconCheck className="size-4"></IconCheck>
                </div>
                <p className="dark:text-white">{item}</p>
              </div>
            );
          })}
        </div>
        {/* Q&A */}
        <div className="mb-10">
          <h3 className="text-xl font-bold">Q&A</h3>
          {course.info.qa.map((item, index) => {
            return (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
      {/* <div className="pb-20">
        <div className="bg-white rounded-lg p-5 border border-gray-300 dark:border-gray-200 dark:bg-grayDarker shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-2xl text-red-500 font-bold">
              {course.price.toLocaleString("en-EN")}đ
            </span>
            <span className="text-sm line-through ml-2 font-semibold text-gray-500">
              {course.sale_price.toLocaleString("en-EN")}đ
            </span>
            <span className="inline-block rounded-md bg-primary/90 text-white ml-auto px-3 py-1 font-bold">
              {Math.floor((course.price / course.sale_price) * 100)}%
            </span>
          </div>
          <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>Video Full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconMember className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconCourse className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <ButtonEnroll
            course={course._id}
            user={JSON.parse(JSON.stringify(findUser))}
            amount={course.price}
            // discount={course.price}
          ></ButtonEnroll>
        </div>
      </div> */}
      {userCourses?.includes(course._id.toString()) ? (
        <AlreadyStudy></AlreadyStudy>
      ) : (
        <CourseWidget
          course={course}
          findUser={findUser}
          duration={formatMinutesToHour(duration)}
        ></CourseWidget>
      )}
    </div>
  );
};

export default page;
