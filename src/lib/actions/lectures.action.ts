"use server";
import Course from "@/database/course.model";
import { connectToDatabase } from "../mongoose";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";

export const createLecture = async (params: TCreateLectureParams) => {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return null;
    const lecture = await Lecture.create(params);
    findCourse.lectures.push(lecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const updateLecture = async (params: TUpdateLectureParams) => {
  try {
    connectToDatabase();
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      }
    );
    revalidatePath(params.updateData.path || "/");
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
