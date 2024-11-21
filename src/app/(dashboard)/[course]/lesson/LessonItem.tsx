"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { IconPlay } from "@/icons";
import { createHistory } from "@/lib/actions/history.action";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LessonItem = ({
  lesson,
  url,
  isActive,
  isChecked,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url: string;
  isActive: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    await createHistory({
      course: lesson.course,
      lesson: lesson._id,
      checked,
      path: url,
    });
  };
  return (
    <div className="flex items-center gap-3 mb-5 pb-5 border-b-2 border-dotted border-b-gray-400 bgDarkMode borerDarkMode">
      <Checkbox
        defaultChecked={isChecked}
        className="size-5 flex-shrink-0"
        onCheckedChange={(checked) => handleCompleteLesson(checked)}
      />
      <IconPlay className="flex-shrink-0 size-5 p-1  rounded-md bg-primary text-white"></IconPlay>
      <Link
        href={url}
        className={cn(
          `text-sm font-medium dark:text-white/80 cursor-pointer line-clamp-1 ${
            isActive
              ? ` !text-primary font-bold`
              : "text-black/80 font-semibold"
          }`
        )}
      >
        {lesson.title} {lesson.title}
      </Link>
      <span className="ml-auto text-xs font-semibold flex-shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
