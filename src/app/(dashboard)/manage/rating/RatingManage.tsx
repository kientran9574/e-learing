"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, ratingList, ratingStatus } from "@/constants";
import { ERatingStatus } from "@/types/enum";
import StatusBadge from "@/components/common/StatusBadge";
import IconCheck from "@/icons/IconCheck";
import IconCancel from "@/icons/IconCancel";
import Heading from "@/components/common/Heading";
import useQueryString from "@/hook/useQueryString";
import { TRatingItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { deleteRating, updateRating } from "@/lib/actions/rating.actions";
import Swal from "sweetalert2";
const RatingManage = ({ ratings }: { ratings: TRatingItem[] | undefined }) => {
  const { router, pathname, createQueryString } = useQueryString();
  const handleStatusParams = (status: ERatingStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    }, 500);
    return () => clearTimeout(500);
  };
  const handleUpdateRating = async (id: string) => {
    try {
      await updateRating(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteRating = async (id: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn xóa đánh giá này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa luôn",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteRating(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="w-full flex flex-col lg:flex-row items-center justify-between">
          <h1 className="lg:text-2xl whitespace-nowrap pr-5">
            Quản lý đánh giá
          </h1>
          <div className="w-full mt-2 lg:mt-0 lg:w-[500px] flex gap-3 items-center">
            <Input
              placeholder="Tìm kiếm đánh giá..."
              className="lg:w-[280px] shadow"
              onChange={(e) => handleSearchParams(e)}
            ></Input>
            <Select
              onValueChange={(status) =>
                handleStatusParams(status as ERatingStatus)
              }
            >
              <SelectTrigger className="lg:w-[180px] xl:w-[200px] shadow">
                <SelectValue placeholder="Chọn trạng thái " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ratingStatus.map((status) => {
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
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings &&
            ratings.length > 0 &&
            ratings.map((rating: TRatingItem) => {
              const ratingItemStatus = ratingStatus.find(
                (item) => item.value === rating.status
              );
              const icon = ratingList.find(
                (item) => item.value === rating.rate
              )?.title;
              return (
                <TableRow key={rating.rate}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{rating.content}</strong>
                        <Image
                          width={20}
                          height={20}
                          alt=""
                          src={`/rating/${icon}.png`}
                        />
                      </div>
                      <time>
                        {new Date(rating.created_at).toLocaleDateString(
                          "vi-Vi"
                        )}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/course/${rating.course.slug}`}
                      className="font-semibold hover:text-primary"
                      target="_blank"
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user.name}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={ratingItemStatus}></StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={commonClassNames.action}
                        onClick={() => handleUpdateRating(rating._id)}
                      >
                        <IconCheck />
                      </button>
                      <button type="button" className={commonClassNames.action}>
                        <IconCancel
                          onClick={() => handleDeleteRating(rating._id)}
                        />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatingManage;
