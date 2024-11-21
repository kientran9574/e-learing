import Heading from "@/components/common/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";
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
  if (!course) return;
  return (
    <>
      <Heading className="capitalize">
        Nội dung:{" "}
        <strong className="lg:text-xl xl:text-3xl text-primary font-bold">
          {course.title}
        </strong>
      </Heading>
      <CourseUpdateContent course={course}></CourseUpdateContent>
    </>
  );
};

export default page;
