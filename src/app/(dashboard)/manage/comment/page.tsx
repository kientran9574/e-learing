/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commentStatuses, commonClassNames } from "@/constants";
import Link from "next/link";
import IconAddItem from "@/icons/IconAddItem";
import { getCommentsAll } from "@/lib/actions/comment.actions";
import { cn } from "@/lib/utils";
import IconCancel from "@/icons/IconCancel";
import IconCheck from "@/icons/IconCheck";
import FilterComment from "./FilterComment";
import { ECommentStatus } from "@/types/enum";
const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    status: ECommentStatus;
  };
}) => {
  const comments = await getCommentsAll({
    search: searchParams.search || "",
    status: searchParams.status || ECommentStatus.PENDING,
  });
  return (
    <>
      <FilterComment></FilterComment>
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
              <TableHead>Người bình luận</TableHead>
              <TableHead>Bài học</TableHead>
              <TableHead>Thành viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments &&
              comments.map((comment: any) => {
                const commentStatusItem = commentStatuses.find(
                  (item) => item.value === comment.status
                );
                return (
                  <TableRow key={comment._id}>
                    <TableCell>
                      <p>{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.lesson?.title}</TableCell>
                    <TableCell>{comment.user.name}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          commonClassNames.status,
                          commentStatusItem?.className
                        )}
                      >
                        {commentStatusItem?.title}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={commonClassNames.action}
                        >
                          <IconCheck />
                        </button>
                        <button
                          type="button"
                          className={commonClassNames.action}
                        >
                          <IconCancel />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <Pagination
          handleChangePage={handleChangePage}
          currentPage={currentPage}
          totalPages={total}
        ></Pagination> */}
      </div>
    </>
  );
};

export default page;
