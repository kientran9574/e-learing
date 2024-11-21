"use server";
import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/course/CourseAddNew";
import { getUsersInfo } from "@/lib/actions/users.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUsersInfo(userId);
  return (
    <>
      <Heading>Tạo khóa học</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))}></CourseAddNew>
    </>
  );
};
export default page;
