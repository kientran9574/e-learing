/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Rating from "@/database/rating.model";
import { connectToDatabase } from "../mongoose";
import { TCreateRatingParams, TRatingItem } from "@/types";
import Course from "@/database/course.model";
import { ERatingStatus } from "@/types/enum";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

export const createRating = async (params: TCreateRatingParams) => {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: "rating",
      model: Rating,
    });
    const newRating = await Rating.create(params);
    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newRating)),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndUpdate(id, { status: ERatingStatus.ACTIVE });
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndDelete(id);
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getRatings(
  params: any
): Promise<TRatingItem[] | undefined> {
  try {
    connectToDatabase();
    const { search, status } = params;
    const query: FilterQuery<typeof Rating> = {};
    if (search) {
      query.$or = [{ content: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await Rating.find(query)
      .populate({
        path: "course",
        select: "title slug",
      })
      .populate({
        path: "user",
        select: "name",
      });
    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log(error);
  }
}
