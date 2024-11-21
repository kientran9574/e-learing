"use server";
import CourseManage from "@/components/course/CourseManage";
import { getCourseList } from "@/lib/actions/courses.action";
import { ECourseStatus } from "@/types/enum";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    status: ECourseStatus;
  };
}) => {
  const courseManage = await getCourseList({
    status: searchParams.status || ECourseStatus.APPROVED,
    search: searchParams.search,
  });
  if (!courseManage) return null;
  return (
    <>
      <CourseManage
        courses={JSON.parse(JSON.stringify(courseManage))}
      ></CourseManage>
    </>
  );
};

export default page;
