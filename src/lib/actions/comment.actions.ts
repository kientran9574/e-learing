/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Comment, { IComment } from "@/database/comment.model";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Lesson from "@/database/lesson.model";
import { FilterQuery } from "mongoose";

export const createComment = async (
  params: any
): Promise<boolean | undefined> => {
  try {
    connectToDatabase();
    const newUser = await Comment.create(params);
    if (!newUser) return false;
    const urlComment = `${params.path.courseSlug}/lesson?slug=${params.path.lessonBySlug}`;
    revalidatePath(urlComment || "/");
    return true;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getComments = async (
  id: string
): Promise<IComment[] | undefined> => {
  try {
    connectToDatabase();
    const data = await Comment.find({ lesson: id }).populate({
      path: "user",
      model: User,
      select: "name avatar",
    });

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getCommentsAll = async (params: any) => {
  const { search, status } = params;
  const query: FilterQuery<typeof Comment> = {};
  if (search) {
    query.$or = [{ content: { $regex: search, $options: "i" } }];
  }
  if (status) {
    query.status = status;
  }
  try {
    connectToDatabase();
    const data = await Comment.find(query)
      .populate({
        path: "user",
        model: User,
        select: "name avatar",
      })
      .populate({
        path: "lesson",
        model: Lesson,
        select: "title slug",
      })
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
