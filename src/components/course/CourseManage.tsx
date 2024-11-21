"use client";
import Heading from "@/components/common/Heading";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import IconEdit from "@/icons/IconEdit";
import IconDelete from "@/icons/IconDelete";
import IconEye from "@/icons/IconEye";
import { IconCourse } from "@/icons";
import Swal from "sweetalert2";
import { ICourse } from "@/database/course.model";
import { updateCourse } from "@/lib/actions/courses.action";
import { ECourseStatus } from "@/types/enum";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import Link from "next/link";
import IconAddItem from "@/icons/IconAddItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryString from "@/hook/useQueryString";
const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const { router, pathname, createQueryString } = useQueryString();
  const handleStatusParams = (status: string) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    }, 1000);
    return () => clearTimeout(1000);
  };
  const handleDelete = (slug: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async () => {
        const res = await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
        });
        if (res) {
          toast.success("Xóa khóa học thành công");
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };
  const handleCourseStatus = (slug: string, statusCourse: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async () => {
        await updateCourse({
          slug,
          updateData: {
            status:
              statusCourse === ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
            _destroy: false,
          },
        });
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };
  return (
    <>
      <Heading className="w-full flex flex-col lg:flex-row items-center justify-between">
        <h1 className="lg:text-2xl whitespace-nowrap pr-5">Quản lý khóa học</h1>
        <div className="w-full mt-2 lg:mt-0 lg:w-[500px] flex gap-3 items-center">
          <Input
            placeholder="Tìm kiếm khóa học..."
            className="lg:w-[280px] shadow"
            onChange={(e) => handleSearchParams(e)}
          ></Input>
          <Select onValueChange={(status) => handleStatusParams(status)}>
            <SelectTrigger className="lg:w-[180px] xl:w-[200px] shadow">
              <SelectValue placeholder="Chọn trạng thái " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => {
                  return (
                    <SelectItem value={status.value} key={status.value}>
                      {status.title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Heading>
      <div className="p-5">
        <div className="flex items-end justify-end py-2">
          <Link
            href={`/manage/course/new`}
            className=" text-white bg-primary  dark:bg-grayDarker dark:border dark:border-grayDark rounded-full p-2 hover:animate-bounce"
          >
            <IconAddItem className="size-5"></IconAddItem>
          </Link>
        </div>
        <Table className="table-responsive">
          <TableHeader>
            <TableRow>
              <TableHead>Thông tin</TableHead>
              <TableHead>Gía</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status
              );
              return (
                <TableRow key={course._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={course.image}
                        className="object-contain rounded-md shadow"
                        width={80}
                        height={80}
                        alt="image"
                      ></Image>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xs lg:text-sm font-bold whitespace-nowrap">
                          {course.title}
                        </h3>
                        <h4 className="text-gray-400">
                          {new Date(course.created_at).toLocaleDateString()}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        handleCourseStatus(course.slug, course.status)
                      }
                      className={cn(
                        "font-medium text-xs whitespace-nowrap",
                        courseStatusItem?.className
                      )}
                    >
                      {courseStatusItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <button className={commonClassNames.action}>
                        <IconCourse></IconCourse>
                      </button>
                      <button className={commonClassNames.action}>
                        <IconEye></IconEye>
                      </button>
                      <button className={commonClassNames.action}>
                        <IconEdit></IconEdit>
                      </button>
                      <button
                        onClick={() => handleDelete(course.slug)}
                        className={commonClassNames.action}
                      >
                        <IconDelete></IconDelete>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CourseManage;
