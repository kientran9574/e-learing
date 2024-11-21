/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getCourseBySlug } from "@/lib/actions/courses.action";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lessons.action";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ILesson } from "@/database/lesson.model";
import { getHistories } from "@/lib/actions/history.action";
import LessonItem from "./LessonItem";
import { auth } from "@clerk/nextjs/server";
import { getUsersInfo } from "@/lib/actions/users.actions";
import PageNotFound from "@/app/not-found";
import LessonSaveUrl from "./LessonSaveUrl";
import LessonComment from "./LessonComment";
const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound></PageNotFound>;
  const findUser = await getUsersInfo(userId);
  if (!findUser) return <PageNotFound></PageNotFound>;
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  const courseSlug = findCourse?.slug;
  if (!findCourse) return;
  const courseId = findCourse?._id.toString();
  // ktra user có sỡ hữu khóa học hay không ?
  if (!findUser.courses.includes(courseId as any))
    return <PageNotFound></PageNotFound>;
  const lessonList = await findAllLesson({ course: courseId || "" });
  const lessonDetails = await getLessonBySlug({
    slug: slug,
    course: courseId,
  });
  if (!lessonDetails) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  const lectures = findCourse.lectures;
  const histories = await getHistories({
    course: courseId,
  });
  const completePercentage =
    ((histories?.length || 0) / (lessonList?.length || 0)) * 100;
  return (
    <div className="p-5">
      <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen items-start">
        <LessonSaveUrl
          course={course}
          url={`/${course}/lesson?slug=${slug}`}
        ></LessonSaveUrl>
        <div>
          <div className="relative mb-5 aspect-video rounded">
            <iframe
              className="w-full h-full object-fill rounded"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
          </div>
          <div className="flex items-start flex-col">
            <LessonNavigation
              nextLesson={
                !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
              }
              prevLesson={
                !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
              }
              data={{
                userId: findUser._id.toString(),
                courseId: findCourse._id.toString(),
              }}
            ></LessonNavigation>
            <LessonComment
              courseSlug={courseSlug || ""}
              userId={findUser?._id.toString() || ""}
              lessonId={lessonDetails?._id.toString() || ""}
              lessonBySlug={lessonDetails.slug || ""}
            ></LessonComment>
          </div>
        </div>
        <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
          <div className="h-2 w-full rounded-full border borderDarkMode bgDarkMode mb-2 ">
            <div
              className={`w-0 h-full rounded-full bg-primary`}
              style={{
                width: `${completePercentage}%`,
              }}
            ></div>
          </div>
          <div className="flex flex-col gap-5">
            {lectures.map((item) => {
              return (
                <Accordion type="single" collapsible key={item._id}>
                  <AccordionItem value={item._id}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent className="mb-2">
                      {item.lessons.map((lesson: ILesson) => {
                        const url = `/${course}/lesson?slug=${lesson.slug}`;
                        const isActive = lesson.slug === slug;
                        return (
                          <div className="flex flex-col gap-5" key={lesson._id}>
                            <LessonItem
                              lesson={JSON.parse(JSON.stringify(lesson))}
                              url={url}
                              isActive={isActive}
                              isChecked={
                                histories &&
                                histories.some(
                                  (el) =>
                                    el.lesson.toString() ===
                                    lesson._id.toString()
                                )
                              }
                            ></LessonItem>
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
