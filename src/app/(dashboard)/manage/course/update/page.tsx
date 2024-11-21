"use server";
import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCourseBySlug } from "@/lib/actions/courses.action";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const course = await getCourseBySlug({ slug: searchParams.slug });
  if (!course) return null;
  return (
    <>
      <Heading>Cập nhật khóa học</Heading>
      <CourseUpdate course={course}></CourseUpdate>
    </>
  );
};

export default page;
