"use client";
import Heading from "@/components/common/Heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { commentStatuses } from "@/constants";
import useQueryString from "@/hook/useQueryString";
import { ECommentStatus } from "@/types/enum";
import React from "react";

const FilterComment = () => {
  const { router, pathname, createQueryString } = useQueryString();
  const handleStatusParams = (status: ECommentStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  let searchTimeout: NodeJS.Timeout;
  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Xóa timeout cũ nếu có
    clearTimeout(searchTimeout);

    const value = e.target.value;
    console.log("🚀 ~ handleSearchParams ~ value:", value);
    searchTimeout = setTimeout(() => {
      if (value.trim() === "") {
        // Xóa query string "search" nếu input rỗng
        router.push(pathname);
      } else {
        // Thêm query string "search" nếu có giá trị
        router.push(`${pathname}?${createQueryString("search", value)}`);
      }
    }, 500);
  };
  return (
    <Heading className="w-full flex flex-col lg:flex-row items-center justify-between">
      <h1 className="lg:text-2xl whitespace-nowrap pr-5">Quản lý bình luận</h1>
      <div className="w-full mt-2 lg:mt-0 lg:w-[500px] flex gap-3 items-center">
        <Input
          placeholder="Tìm kiếm bình luận..."
          className="lg:w-[280px] shadow"
          onChange={(e) => handleSearchParams(e)}
        ></Input>
        <Select
          onValueChange={(status) =>
            handleStatusParams(status as ECommentStatus)
          }
        >
          <SelectTrigger className="lg:w-[180px] xl:w-[200px] shadow">
            <SelectValue placeholder="Chọn trạng thái " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {commentStatuses.map((status) => {
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
  );
};

export default FilterComment;
