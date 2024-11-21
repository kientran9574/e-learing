"use client";
import { Button } from "@/components/ui/button";
import IconLeftArrow from "@/icons/IconLeftArrow";
import IconRightArrow from "@/icons/IconRightArrow";
import { useRouter } from "next/navigation";
import React from "react";
import ButtonRating from "./ButtonRating";
const LessonNavigation = ({
  nextLesson,
  prevLesson,
  data,
}: {
  nextLesson: string;
  prevLesson: string;
  data: {
    userId: string;
    courseId: string;
  };
}) => {
  
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Button
          className="size-10 p-3"
          disabled={!prevLesson}
          onClick={() => {
            return !prevLesson ? null : router.push(prevLesson);
          }}
        >
          <IconLeftArrow />
        </Button>
        <Button
          className="size-10 p-3"
          disabled={!nextLesson}
          onClick={() => {
            return !nextLesson ? null : router.push(nextLesson);
          }}
        >
          <IconRightArrow />
        </Button>
      </div>
      <div className="ml-">
        <ButtonRating data={data}></ButtonRating>
      </div>
    </div>
  );
};

export default LessonNavigation;
{
  /* <iframe
    width="1088"
    height="612"
    src="https://www.youtube.com/embed/7JWk10sr45A?list=PLncHg6Kn2JT5EVkhKoJmzOytHY39Mrf_o"
    title="Lab 01: Làm quen với ngôn ngữ Java | Khóa Học Java Cơ Bản Từ A tới Z cho Beginner"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>; */
}
