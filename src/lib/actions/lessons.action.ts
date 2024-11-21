"use server";
import Course from "@/database/course.model";
import { connectToDatabase } from "../mongoose";
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import Lecture from "@/database/lecture.model";
import Lesson, { ILesson } from "@/database/lesson.model";
import { revalidatePath } from "next/cache";

export const createLesson = async (params: TCreateLessonParams) => {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;
    const newLesson = await Lesson.create(params);
    if (!newLesson) return;
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const updateLesson = async (params: TUpdateLessonParams) => {
  try {
    connectToDatabase();
    await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
      slug,
      course,
    });
    return JSON.parse(JSON.stringify(findLesson));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}
export async function findAllLesson({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.find({
      course,
    });
    return JSON.parse(JSON.stringify(findLesson));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}
export async function findLesson({
  lesson,
}: {
  lesson: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
      lesson,
    });
    return JSON.parse(JSON.stringify(findLesson));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}
