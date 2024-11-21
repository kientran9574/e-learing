"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CourseGrid from "../course/CourseGrid";
import CourseItem from "../course/CourseItem";
import { StudyCoursesProps } from "@/types";

const StudyCourse = ({ courses }: { courses: StudyCoursesProps[] }) => {
  let lastLesson = [];
  if (typeof localStorage !== "undefined") {
    lastLesson = localStorage
      ? JSON.parse(localStorage?.getItem("lastLesson") || "[]") || []
      : [];
  }
  if (!lastLesson) return;
  return (
    <CourseGrid>
      {courses.length > 0 &&
        courses.map((course) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const url = lastLesson.find(
            (el: any) => el.course === course.slug
          )?.lesson;
          const firstLessonUrl = course.lectures[0].lessons[0].slug;
          return (
            <CourseItem
              key={course.slug}
              data={course}
              cta="Tiếp tục học"
              url={url || `/${course.slug}/lesson?slug=${firstLessonUrl}`}
            ></CourseItem>
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourse;
