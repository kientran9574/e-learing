/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  StudyCoursesProps,
  TCourseUpdateParams,
  TCreateCourseParams,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { auth } from "@clerk/nextjs/server";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { ECourseStatus, ERatingStatus } from "@/types/enum";
import Rating from "@/database/rating.model";

export const getCourseList = async (
  params: TGetAllCourseParams
): Promise<StudyCoursesProps[] | undefined> => {
  try {
    connectToDatabase();
    const { search, status } = params;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .populate({
        path: "rating",
        model: Rating,
      })
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export const getCourseBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> => {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug })
      .populate({
        path: "lectures",
        model: Lecture,
        match: {
          _destroy: false,
        },
        populate: {
          path: "lessons",
          model: Lesson,
          match: {
            _destroy: false,
          },
        },
      })
      .populate({
        path: "rating",
        model: Rating,
        populate: {
          path: "user",
          model: User,
        },
        // match: {
        //   status: ERatingStatus.ACTIVE,
        // },
      });
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getUserCourses = async (): Promise<ICourse[] | undefined> => {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });
    if (!findUser) return;
    return findUser.courses;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const createCourse = async (params: TCreateCourseParams) => {
  try {
    connectToDatabase();
    const exitsCourse = await Course.findOne({ slug: params.slug });
    if (exitsCourse) {
      return {
        success: false,
        message: "Tên khóa học đã tồn tại hoặc đường dẫn khóa học đã tồn tại!",
      };
    }
    const newCourse = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCourse)),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const updateCourse = async (params: TUpdateCourseParams) => {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) {
      return null;
    }
    const updateCourse = await Course.findOneAndUpdate(
      { slug: params.slug },
      params.updateData,
      {
        new: true,
      }
    );
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updateCourse)),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const updateCourseView = async ({ slug }: { slug: string }) => {
  try {
    connectToDatabase();
    await Course.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      }
    );
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getCourseLessonsInfo = async ({ slug }: { slug: string }) => {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug })
      .select("lectures")
      .populate({
        path: "lectures",
        select: "lessons",
        populate: {
          path: "lessons",
          select: "duration",
        },
      })
      .populate({
        path: "rating",
        model: Rating,
        match: {
          status: ERatingStatus.ACTIVE,
        },
      });
    const lessons = course.lectures.map((item: any) => item.lessons).flat();
    const duration = lessons.reduce((acc: number, crr: any) => {
      return acc + crr.duration;
    }, 0);
    return {
      duration,
      lessons: lessons.length,
    };
  } catch (error) {
    console.log("🚀 ~ getCourseLessonsInfo ~ error:", error);
  }
};
