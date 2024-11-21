import Heading from "@/components/common/Heading";
import StudyCourse from "@/components/study/StudyCourse";
import { getUserCourses } from "@/lib/actions/courses.action";
import React from "react";

const page = async () => {
  const courses = await getUserCourses();
  if (!courses) return null;
  
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse courses={JSON.parse(JSON.stringify(courses))}></StudyCourse>
    </>
  );
};

export default page;
