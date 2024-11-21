/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CommentForm from "../../manage/comment/CommentForm";
import { getComments } from "@/lib/actions/comment.actions";
import CommentItem from "../../manage/comment/CommentItem";
const LessonComment = async ({
  userId,
  lessonId,
  courseSlug,
  lessonBySlug,
}: {
  userId: string;
  lessonId: string;
  courseSlug: string;
  lessonBySlug: string;
}) => {
  const comments = await getComments(lessonId);
  if (!comments) return;
  // Lấy comments gốc (level 0)
  const rootComments = comments.filter((item) => !item.parentId);

  return (
    <>
      <div className="w-full">
        <CommentForm
          userId={userId}
          lessonId={lessonId}
          courseSlug={courseSlug}
          lessonBySlug={lessonBySlug}
        ></CommentForm>
      </div>
      <div className="flex flex-col gap-5 mt-10 w-full">
        <div className="flex items-center gap-10">
          <h2 className="text-2xl font-bold">Comments</h2>
          <span className="py-1 px-4 bg-primary rounded-full text-white font-semibold">{comments?.length}</span>
        </div>
        <div className="flex flex-col gap-3">
          {rootComments &&
            rootComments.map((comment: any) => {
              return (
                <CommentItem
                  comment={comment}
                  key={comment._id}
                  userId={userId}
                  lessonId={lessonId}
                  courseSlug={courseSlug}
                  lessonBySlug={lessonBySlug}
                  comments={comments || []}
                ></CommentItem>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LessonComment;
