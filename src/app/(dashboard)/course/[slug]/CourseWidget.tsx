/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IUser } from "@/database/user.model";
import { TCourseUpdateParams } from "@/types";
import React, { useState } from "react";
import ButtonEnroll from "./ButtonEnroll";
import { IconCourse, IconMember, IconPlay } from "@/icons";
import CourseCoupon from "./CourseCoupon";

const CourseWidget = ({
  course,
  findUser,
  duration,
}: {
  course: TCourseUpdateParams;
  findUser: IUser | undefined;
  duration: string;
}) => {
  const [price, setPrice] = useState(course.price);
  const [couponId, setCouponId] = useState("");
  return (
    <div className="pb-20">
      <div className="bg-white rounded-lg p-5 border border-gray-300 dark:border-gray-200 dark:bg-grayDarker shadow-sm">
        <div className="flex items-center mb-4">
          <span className="text-2xl text-red-500 font-bold">
            {price.toLocaleString("en-EN")}đ
          </span>
          <span className="text-sm line-through ml-2 font-semibold text-gray-500">
            {course.sale_price.toLocaleString("en-EN")}đ
          </span>
          <span className="inline-block rounded-md bg-primary/90 text-white ml-auto px-3 py-1 font-bold">
            {Math.floor((course.price / course.sale_price) * 100)}%
          </span>
        </div>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>{duration}</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconMember className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconCourse className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          course={course._id}
          user={JSON.parse(JSON.stringify(findUser))}
          amount={course.price}
          total={price}
          // discount={course.price}
          couponId={couponId}
        ></ButtonEnroll>
        <CourseCoupon
          setPrice={setPrice}
          originalPrice={course.price}
          setCouponId={setCouponId}
          courseId={course._id}
        ></CourseCoupon>
      </div>
    </div>
  );
};

export default CourseWidget;
