/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import CommentReplay from "./CommentReplay";
import { getRepliesComment } from "@/utils";

const CommentItem = ({
  comment,
  userId,
  lessonId,
  courseSlug,
  lessonBySlug,
  comments = [],
}: {
  comment: any;
  userId: string;
  lessonId: string;
  courseSlug: string;
  lessonBySlug: string;
  comments: any;
}) => {
  const replies = getRepliesComment(comments, comment._id);
  const level = comment.level || 0;
  return (
    <>
      <div
        className="flex items-start gap-5 p-3 border borderDarkMode rounded-md shadow ml-auto mb-3"
        style={{
          width: `calc(100% - ${level * 55}px)`,
        }}
      >
        <Image
          className="size-10 rounded-full bg-red-300 flex-shrink-0 overflow-hidden inline-flex"
          src={comment.user?.avatar}
          width={30}
          height={30}
          alt="Image err"
          suppressHydrationWarning
        ></Image>
        <div className="flex flex-col gap-1 w-full">
          <h4 className="font-bold text-lg">{comment.user?.name}</h4>
          <p className="mb-3">{comment?.content}</p>
          <CommentReplay
            comment={comment}
            userId={userId}
            lessonId={lessonId}
            courseSlug={courseSlug}
            lessonBySlug={lessonBySlug}
          ></CommentReplay>
        </div>
      </div>
      {replies.length > 0 &&
        replies.map((replay: any) => {
          console.log(replay);
          return (
            <CommentItem
              comment={replay}
              key={replay._id}
              userId={userId}
              lessonId={lessonId}
              courseSlug={courseSlug}
              lessonBySlug={lessonBySlug}
              comments={comments}
            ></CommentItem>
          );
        })}
    </>
  );
};

export default CommentItem;
