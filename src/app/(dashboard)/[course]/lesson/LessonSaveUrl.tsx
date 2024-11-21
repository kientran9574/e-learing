"use client";
/* eslint-disable prefer-const */
import { useEffect } from "react";

const LessonSaveUrl = ({ course, url }: { course: string; url: string }) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let results: any[] =
      JSON.parse(localStorage.getItem("lastLesson") || "[]") || [];
    const item = {
      course,
      lesson: url,
    };
    results = results.filter((el) => el.course !== course);
    results.push(item);
    localStorage.setItem("lastLesson", JSON.stringify(results));
  }, [course, url]);
  return null;
};

export default LessonSaveUrl;
