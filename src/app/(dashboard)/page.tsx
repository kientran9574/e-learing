import Heading from "@/components/common/Heading";
import CourseGrid from "@/components/course/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
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
  const courses = await getCourseList({
    status: searchParams.status || ECourseStatus.APPROVED,
    search: searchParams.search,
  });
  if (!courses) return null;
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 &&
          courses.map((course) => {
            return <CourseItem key={course.slug} data={course}></CourseItem>;
          })}
      </CourseGrid>
    </>
  );
};

export default page;
