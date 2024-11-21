"use server";

import { TCreateHistoryParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import { auth } from "@clerk/nextjs/server";
import User from "@/database/user.model";
import History, { IHistory } from "@/database/history.model";
import { revalidatePath } from "next/cache";

export const createHistory = async (params: TCreateHistoryParams) => {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path);
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getHistories = async (params: {
  course: string;
}): Promise<IHistory[] | undefined> => {
  try {
    connectToDatabase();
    const histories = await History.find({
      course: params.course,
    });
    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
