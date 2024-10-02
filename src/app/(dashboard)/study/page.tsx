import Heading from "@/components/common/Heading";
import CourseItem from "@/components/course/CourseItem";
import React from "react";

const page = () => {
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <div className=" bg-neutral-100 p-5 h-full">
        <div className="grid grid-cols-3 gap-8">
          <CourseItem></CourseItem>
          <CourseItem></CourseItem>
          <CourseItem></CourseItem>
        </div>
      </div>
    </>
  );
};

export default page;
