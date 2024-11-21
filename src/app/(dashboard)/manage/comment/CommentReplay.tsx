"use client";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { timeAgo } from "@/utils";
import { IComment } from "@/database/comment.model";
import { motion, AnimatePresence } from "motion/react";
const CommentReplay = ({
  comment,
  userId,
  lessonId,
  courseSlug,
  lessonBySlug,
}: {
  userId: string;
  lessonId: string;
  comment?: IComment;
  courseSlug?: string;
  lessonBySlug?: string
}) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
        <span>{timeAgo(comment?.created_at || "")}</span>
        <span className="rounded-full size-1 bg-gray-300"></span>
        <button onClick={() => setShowComment(!showComment)}>Replay</button>
      </div>

      {/* Sử dụng AnimatePresence để quản lý animation khi unmount */}
      <AnimatePresence mode="wait">
        {showComment && (
          <motion.div
            key="comment-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <CommentForm
              userId={userId}
              lessonId={lessonId}
              _comment={comment}
              courseSlug={courseSlug}
              lessonBySlug={lessonBySlug}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommentReplay;
