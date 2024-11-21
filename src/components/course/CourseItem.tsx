"use client";
import IconEye from "@/icons/IconEye";
import IconStar from "@/icons/IconStar";
import IconTime from "@/icons/IconTime";
import { getCourseLessonsInfo } from "@/lib/actions/courses.action";
import { StudyCoursesProps } from "@/types";
import { formatMinutesToHour, formatNumberToK } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CourseItem = ({
  data,
  cta,
  url,
}: {
  data: StudyCoursesProps;
  cta?: string;
  url?: string;
}) => {
  const courseUrl = url ? url : `/course/${data.slug}`;
  console.log("123", data);
  const [duration, setDuration] = useState<number>(0);
  // const [lessons, setLessons] = useState<number>(0);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const courseInfo = await getCourseLessonsInfo({ slug: data.slug });
      if (courseInfo) {
        setDuration(courseInfo.duration);
        // setLessons(courseInfo.lessons);
      }
    };

    fetchCourseInfo();
  }, [data.slug]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rate = data.rating.map((r: any) => r.rate);
  return (
    <div className="bg-white dark:bg-grayDarker  border border-gray-300 dark:border-grayDark overflow-hidden rounded-lg shadow flex flex-col">
      <Link href={courseUrl} className="inline-block w-full h-[250px]">
        <Image
          src={data.image}
          alt="image"
          className="w-full h-full object-fill flex-shrink-0"
          width={600}
          height={600}
          priority
        />
      </Link>
      <div className="border-t border-t-gray-300"></div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-primary dark:text-gray-200 font-bold text-lg flex flex-1 items-start capitalize">
          {data.title}
        </h2>
        <div className="flex  items-center justify-between mt-5">
          <div className="flex items-center dark:text-grayDark">
            <div className="flex items-center gap-1">
              <IconStar className="size-4"></IconStar>
              <span className="font-medium text-sm">{rate}</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconEye className="size-4"></IconEye>
              <span className="font-medium text-sm">
                {formatNumberToK(data.views)}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconTime className="size-4"></IconTime>
              <span className="font-medium text-sm">
                {formatMinutesToHour(duration)}
              </span>
            </div>
            {/* <div className="flex items-center gap-1 ml-4">
              <IconLevel className="size-4"></IconLevel>
              <span className="font-medium text-sm">{data.level}</span>
            </div> */}
          </div>
          <div className="text-xl text-red-500 dark:text-red-500  font-extrabold">
            {data.price.toLocaleString()}đ
          </div>
        </div>
        <Link
          href={courseUrl}
          className="w-full bg-primary flex items-center justify-center text-white rounded-lg h-10 mt-8 font-bold"
        >
          {cta || "Xem chi tiết"}
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
