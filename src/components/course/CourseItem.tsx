import IconEye from "@/icons/IconEye";
import IconLevel from "@/icons/IconLevel";
import IconStar from "@/icons/IconStar";
import IconTime from "@/icons/IconTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseItem = () => {
  return (
    <div className="bg-white dark:bg-grayDarker  border border-gray-300 dark:border-grayDark  rounded-2xl shadow">
      <Link href={"/"} className="inline-block w-full h-[250px] rounded-t-xl">
        <Image
          src="https://images.unsplash.com/photo-1726858528377-72d8f254ed87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          className="w-full h-full object-cover rounded-t-xl"
          width={500}
          height={500}
          priority
        />
      </Link>
      <div className="p-5 flex flex-col">
        <h2 className="text-primary dark:text-gray-200 font-bold text-lg flex flex-1 items-start capitalize">
          Khóa học java pro
        </h2>
        <div className="flex  items-center justify-between mt-5">
          <div className="flex items-center dark:text-grayDark">
            <div className="flex items-center gap-1">
              <IconStar className="size-4"></IconStar>
              <span className="font-medium text-sm">5.0</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconEye className="size-4"></IconEye>
              <span className="font-medium text-sm">1000</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconTime className="size-4"></IconTime>
              <span className="font-medium text-sm">20p50s</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconLevel className="size-4"></IconLevel>
              <span className="font-medium text-sm">Trung bình</span>
            </div>
          </div>
          <div className="text-xl text-primary dark:text-red-500  font-medium">
            799.000đ
          </div>
        </div>
        <Link
          href={"/"}
          className="w-full bg-primary flex items-center justify-center text-white rounded-lg h-10 mt-8 font-bold"
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
